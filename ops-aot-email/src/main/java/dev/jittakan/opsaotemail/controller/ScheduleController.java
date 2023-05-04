package dev.jittakan.opsaotemail.controller;

import dev.jittakan.opsaotemail.service.EmailService;
import dev.jittakan.opsaotemail.domain.EmailRequest;
import dev.jittakan.opsaotemail.domain.EmailResponse;
import dev.jittakan.opsaotemail.domain.EmailRepository;
import org.quartz.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/emails")
public class ScheduleController {
	private static final Logger logger = LoggerFactory.getLogger(ScheduleController.class);

	@Autowired
	private Scheduler scheduler;

	private final EmailRepository emailRepository;

	@Autowired
	public ScheduleController(EmailRepository emailRepository) {
		this.emailRepository = emailRepository;
	}

	@GetMapping
	public List<EmailRequest> getClients() {
		return emailRepository.findAll();
	}

	@GetMapping("/{id}")
	public EmailRequest getClient(@PathVariable Long id) {
		return emailRepository.findById(id).orElseThrow(RuntimeException::new);
	}

	@PostMapping
	public ResponseEntity<EmailResponse> scheduleEmail(@Valid @RequestBody EmailRequest emailRequest) {
		try {
			ZonedDateTime dateTime = ZonedDateTime.of(emailRequest.getDateTime(), emailRequest.getTimeZone());
			if (dateTime.isBefore(ZonedDateTime.now())) {
				EmailResponse emailResponse = new EmailResponse(false, "dateTime must be after current time");
				return ResponseEntity.badRequest().body(emailResponse);
			}

			JobDetail jobDetail = buildJobDetail(emailRequest);
			Trigger trigger = buildJobTrigger(jobDetail, dateTime);
			scheduler.scheduleJob(jobDetail, trigger);

			emailRepository.save(emailRequest);

			EmailResponse scheduleEmailResponse = new EmailResponse(true, jobDetail.getKey().getName(),
					jobDetail.getKey().getGroup(), "Email Scheduled Successfully!");
			return ResponseEntity.ok(scheduleEmailResponse);
		} catch (SchedulerException ex) {
			logger.error("Error scheduling email", ex);

			EmailResponse scheduleEmailResponse = new EmailResponse(false, "Error scheduling email. Please try later!");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(scheduleEmailResponse);
		}
	}

	private JobDetail buildJobDetail(EmailRequest scheduleEmailRequest) {
		JobDataMap jobDataMap = new JobDataMap();

		jobDataMap.put("email", scheduleEmailRequest.getEmail());
		jobDataMap.put("subject", scheduleEmailRequest.getSubject());
		jobDataMap.put("body", scheduleEmailRequest.getBody());

		return JobBuilder.newJob(EmailService.class).withIdentity(UUID.randomUUID().toString(), "email-jobs")
				.withDescription("Send Email Job").usingJobData(jobDataMap).storeDurably().build();
	}

	private Trigger buildJobTrigger(JobDetail jobDetail, ZonedDateTime startAt) {
		return TriggerBuilder.newTrigger().forJob(jobDetail)
				.withIdentity(jobDetail.getKey().getName(), "email-triggers").withDescription("Send Email Trigger")
				.startAt(Date.from(startAt.toInstant()))
				.withSchedule(SimpleScheduleBuilder.simpleSchedule().withMisfireHandlingInstructionFireNow()).build();
	}
//    {
//        "email":"sn.jittakan@hotmail.com",
//        "subject":"Hi Test",
//        "body":"Body is sexy",
//        "dateTime":"2023-03-06T15:56:10",
//        "timeZone":"Asia/Bangkok"
//    }
	
//	public class YourJob implements Job {
//
//	    @Override
//	    public void execute(JobExecutionContext context) throws JobExecutionException {
//	        JobDataMap jobDataMap = context.getJobDetail().getJobDataMap();
//	        String message = jobDataMap.getString("message");
//	        // use the message as needed
//	    }
//	}
	
//	@RestController
//	@RequestMapping("/quartz-jobs")
//	public class QuartzJobController {
//
//	    @Autowired
//	    private Scheduler scheduler;
//
//	    @GetMapping
//	    public ResponseEntity<List<String>> getAllJobDetails() throws SchedulerException {
//	        List<String> jobDetails = new ArrayList<>();
//	        for (JobKey jobKey : scheduler.getJobKeys(GroupMatcher.anyGroup())) {
//	            JobDetail jobDetail = scheduler.getJobDetail(jobKey);
//	            jobDetails.add(jobDetail.getDescription());
//	        }
//	        return ResponseEntity.ok(jobDetails);
//	    }
//
//	    @GetMapping("/{id}")
//	    public ResponseEntity<String> getJobDetailById(@PathVariable String id) throws SchedulerException {
//	        JobKey jobKey = new JobKey(id);
//	        JobDetail jobDetail = scheduler.getJobDetail(jobKey);
//	        if (jobDetail != null) {
//	            return ResponseEntity.ok(jobDetail.getDescription());
//	        } else {
//	            return ResponseEntity.notFound().build();
//	        }
//	    }
//	}


}
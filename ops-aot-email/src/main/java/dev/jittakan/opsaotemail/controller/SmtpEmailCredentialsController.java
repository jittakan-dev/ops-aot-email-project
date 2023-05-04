package dev.jittakan.opsaotemail.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import dev.jittakan.opsaotemail.domain.EmailRequest;
import dev.jittakan.opsaotemail.domain.SmtpEmail;
import dev.jittakan.opsaotemail.domain.SmtpEmailRepository;
import jakarta.mail.internet.MimeMessage;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/smtpEmail")
public class SmtpEmailCredentialsController {

	@Autowired
	private SmtpEmailRepository smtpEmailRepository;

	@Autowired
	private JavaMailSenderImpl mailSender;

	@Value("${spring.mail.username}")
	private String smtpUsername;

	@Value("${spring.mail.password}")
	private String smtpPassword;

	@GetMapping
	public List<SmtpEmail> getSmtpEmails() {
		return smtpEmailRepository.findAll();
	}

	@GetMapping("/properties")
	public ResponseEntity<SmtpEmail> getMailProperties() {
		SmtpEmail mailPropertiesDTO = new SmtpEmail();
//		mailPropertiesDTO.setHost(mailSender.getHost());
//		mailPropertiesDTO.setPort(mailSender.getPort());
		mailPropertiesDTO.setSmtpEmail(mailSender.getUsername());
		mailPropertiesDTO.setSmtpPassword(mailSender.getPassword());
		return ResponseEntity.ok(mailPropertiesDTO);
	}
	
	@PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody SmtpEmail smtpEmail) {
		SmtpEmail savedSmtpEmail = smtpEmailRepository.save(smtpEmail);
		
//		SmtpEmail foundUser = smtpEmailRepository.findBySmtpEmail(smtpEmail.getSmtpEmail());
//        if (foundUser != null && foundUser.getSmtpPassword().equals(smtpEmail.getSmtpPassword())) {
//            return ResponseEntity.ok("Login successful!");
//        } else {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password.");
//        }
        return ResponseEntity.ok("SMTP properties updated and connection verified successfully.");
    }
	@PostMapping("/verify")
	public ResponseEntity<String> updateAndVerifySmtpProperties(@Valid @RequestBody SmtpEmail smtpEmail) {
		try {
//			mailSender.setHost(smtpEmail.getHost());
//			mailSender.setPort(smtpEmail.getPort());
			mailSender.setUsername(smtpEmail.getSmtpEmail());
			mailSender.setPassword(smtpEmail.getSmtpPassword());
			SimpleMailMessage message = new SimpleMailMessage();
			message.setTo(smtpEmail.getSmtpEmail());
			message.setSubject("Testing SMTP connection");
			message.setText("This email is sent to verify the SMTP connection.");

			mailSender.send(message);

			SmtpEmail savedSmtpEmail = smtpEmailRepository.save(smtpEmail);

			return ResponseEntity.ok("SMTP properties updated and connection verified successfully.");

		} catch (MailException e) {

			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Failed to update SMTP properties or verify connection: " + e.getMessage());

		}
	}


}
//@RestController
//@RequestMapping("/mail")
//public class MailController {
//
//    @Autowired
//    private JavaMailSenderImpl mailSender;
//
//    @PostMapping("/update")
//    public ResponseEntity<?> updateMailProperties(@RequestBody MailPropertiesDTO mailPropertiesDTO) {
//        mailSender.setHost(mailPropertiesDTO.getHost());
//        mailSender.setPort(mailPropertiesDTO.getPort());
//        mailSender.setUsername(mailPropertiesDTO.getUsername());
//        mailSender.setPassword(mailPropertiesDTO.getPassword());
//        return ResponseEntity.ok().build();
//    }
//
//    @GetMapping("/properties")
//    public ResponseEntity<MailPropertiesDTO> getMailProperties() {
//        MailPropertiesDTO mailPropertiesDTO = new MailPropertiesDTO();
//        mailPropertiesDTO.setHost(mailSender.getHost());
//        mailPropertiesDTO.setPort(mailSender.getPort());
//        mailPropertiesDTO.setUsername(mailSender.getUsername());
//        mailPropertiesDTO.setPassword(mailSender.getPassword());
//        return ResponseEntity.ok(mailPropertiesDTO);
//    }
//}

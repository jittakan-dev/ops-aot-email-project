package dev.jittakan.opsaotemail.domain;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SmtpEmailRepository extends JpaRepository<SmtpEmail, Long>{
	SmtpEmail findBySmtpEmail(String username);

}

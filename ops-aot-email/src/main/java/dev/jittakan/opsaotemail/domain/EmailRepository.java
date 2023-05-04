package dev.jittakan.opsaotemail.domain;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EmailRepository extends JpaRepository<EmailRequest, Long> {

}

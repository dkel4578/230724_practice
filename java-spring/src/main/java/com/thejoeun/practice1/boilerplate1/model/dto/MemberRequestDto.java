package com.thejoeun.practice1.boilerplate1.model.dto;

import com.thejoeun.practice1.boilerplate1.model.Member;
import com.thejoeun.practice1.boilerplate1.model.enums.Authority;
import lombok.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberRequestDto {
    private String email;
    private String password;
    private String nickname;

    //email 과 password 를 가진 dto 따로 만들고 signup 따로 login 따로 만드는 것이 좋음
    public Member toMember(PasswordEncoder passwordEncoder) {
        return Member.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
                .nickname(nickname)
                .authority(Authority.ROLE_USER)
                .build();
    }


    public MemberResponseDto toMemberResponseDto(MemberRequestDto memberRequestDto) {
        return MemberResponseDto.builder()
                .email("이미 존재하는 이메일 입니다.")
                .nickname("- 가입 실패 -")
                .build();
    }


    public UsernamePasswordAuthenticationToken toAuthentication() {
        return new UsernamePasswordAuthenticationToken(email, password);
    }
}
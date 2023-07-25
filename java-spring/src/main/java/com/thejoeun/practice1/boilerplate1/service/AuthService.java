package com.thejoeun.practice1.boilerplate1.service;

import com.thejoeun.practice1.boilerplate1.config.jwt.JwtTokenProvider;
import com.thejoeun.practice1.boilerplate1.model.Member;
import com.thejoeun.practice1.boilerplate1.model.dto.JwtTokenDto;
import com.thejoeun.practice1.boilerplate1.model.dto.MemberRequestDto;
import com.thejoeun.practice1.boilerplate1.model.dto.MemberResponseDto;
import com.thejoeun.practice1.boilerplate1.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManagerBuilder managerBuilder; //인증정보 관리

    public MemberResponseDto signup(MemberRequestDto requestDto){
        if(memberRepository.existsByEmail(requestDto.getEmail())){
            throw new IllegalArgumentException("이미 가입되어 있는 유저입니다.");
        }

        Member member = requestDto.toMember(passwordEncoder);
        member = memberRepository.save(member);
        return MemberResponseDto.of(member);
    }
    // 참고url:
    // https://velog.io/@tmdgh0221/Spring-Security-%EC%99%80-OAuth-2.0-%EC%99%80-JWT-%EC%9D%98-%EC%BD%9C%EB%9D%BC%EB%B3%B4
    public JwtTokenDto login(MemberRequestDto requestDto){ // 1. request 를 받음
        //2. 미검증 authentication 생성
        UsernamePasswordAuthenticationToken authenticationToken = requestDto.toAuthentication();
        //3. AuthenticationManagerBuilder 에게 authenticationToken 전달
        Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);
        //4. UserDetailsService 에 전달 (AuthenticationManagerBuilder 에 존재)
        //  UserDetailsService 를 implements 를 받는 CustomUserDetailService 로 전달
        JwtTokenDto jwtTokenDto = jwtTokenProvider.generateTokenDto(authentication);

        Member member = memberRepository.findByEmail(requestDto.getEmail()).get();
        member.setAccessToken(jwtTokenDto.getAccessToken());
        member.setAccessTokenExpireIn(jwtTokenDto.getTokenExpiresIn());
        memberRepository.save(member);

        return jwtTokenDto;

    }
}

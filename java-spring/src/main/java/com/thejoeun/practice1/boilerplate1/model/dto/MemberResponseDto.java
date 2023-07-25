package com.thejoeun.practice1.boilerplate1.model.dto;

import com.thejoeun.practice1.boilerplate1.model.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberResponseDto {
    private String email;
    private String nickname;

    public static MemberResponseDto of(Member member) {
        // Member member 의 요소 중 MemberResponseDto 에 있는 것들을 가져 오겠다.
            return MemberResponseDto.builder()
                    .email(member.getEmail())
                    .nickname(member.getNickname())
                    .build();
    }
}
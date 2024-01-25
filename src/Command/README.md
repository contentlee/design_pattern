## Command Pattern

- 요청에 대한 모든 정보가 포함된 독립 실행형 객체를 생성하여, 요청을 객체로 변환하는 행동 대자인 패턴
- 하위클래스가 다수로 존재할 경우, 상위 클래스에 대한 의존성이 높아지므로 이를 해결하고자 사용 (의존성이 높아질수록 수정이 어려워진다)
- 결합도(coupling)가 낮은 디자인 => 그러므로 커맨드에는 개별정보가 많이 존재해서는 안된다
- 관심사 분리의 원칙
- 하위 클래스의 모든 요청사항을 단일 메서드로 실행하도록 한다 (ex. execute(), run())

- invoker - command(interface) - command(concrete) - receiver - client

module.exports = {
  apps: [
    {
      name: 'nestjs-app', // 애플리케이션 이름
      script: './dist/main.js', // 빌드된 NestJS 애플리케이션의 진입 파일
      instances: '2', // CPU 코어 수만큼 실행
      exec_mode: 'cluster', // 클러스터 모드로 실행
      max_memory_restart: '1000M', // 프로세스의 메모리가 1000MB에 도달하면 reload 실행
      merge_logs: true, // 클러스터 모드 사용 시 각 클러스터에서 생성되는 로그를 한 파일로 합쳐준다.
      autorestart: true, // 프로세스 실패 시 자동으로 재시작할지 선택
      env: {
        NODE_ENV: 'development',
        PORT: 3001,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
        DATABASE_URL: 'VAL_DATABASE_URL',
        OPENAPI_KEY: 'VAL_OPENAPI_KEY',
        DEFAULT_YEAR: 'VAL_DEFAULT_YEAR',
      },
    },
  ],
};

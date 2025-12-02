module.exports = {
  apps: [
    {
      name: 'franchise-backend',
      script: './dist/main.js',
      exec_mode: 'cluster',
      instances: '2', // CPU 코어 수
      max_memory_restart: '1000M', // 프로세스의 메모리가 1000MB에 도달하면 reload 실행
      merge_logs: true, // 클러스터 모드 사용 시 각 클러스터에서 생성되는 로그를 한 파일로 합침
      autorestart: true, // 프로세스 실패 시 자동으로 재시작할지 선택
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
        DATABASE_URL: 'VAL_DATABASE_URL',
        OPENAPI_KEY: 'VAL_OPENAPI_KEY',
        DEFAULT_YEAR: 'VAL_DEFAULT_YEAR',
        JWT_SECRET: 'VAL_JWT_SECRET',
      },
    },
  ],
};

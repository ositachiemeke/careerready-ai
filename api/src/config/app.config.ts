export default () => ({
    app: {
      port: process.env.PORT,
    },
  
    database: {
      url: process.env.DATABASE_URL,
    },
  
    openai: {
      apiKey: process.env.OPENAI_API_KEY,
    },
  });
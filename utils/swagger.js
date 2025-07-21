import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Proyecto final Curso Back-End Node Talento Tech',
      version: '1.0.0',
      description: 'Documentación de API Rest con Node.js y Express',
    },
    servers: [
      { url: 'https://proyecto-final-talento-tech-seven.vercel.app' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./routes/*.js'], // Archivos donde escribiremos las anotaciones
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
export { swaggerUi };
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function swaggerConfig(app) {
  const config = new DocumentBuilder()
    .setTitle('Appeiron Node Challenger | Project and Task Manager')
    .setDescription(
      'web-based project management application that allows teams to manage their projects and tasks.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
}

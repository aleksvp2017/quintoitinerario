FROM node:lts-alpine

# instala um servidor http simples para servir conteúdo estático
RUN npm install -g http-server

# faz da pasta 'app' o diretório atual de trabalho
#WORKDIR /app

# copia os arquivos 'package.json' e 'package-lock.json' (se disponível)
COPY index.html .
COPY /dist /dist


EXPOSE 8080
CMD [ "http-server"]
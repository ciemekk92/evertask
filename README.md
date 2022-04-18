# EverTask
###### Autor: Przemysław Reducha

Aplikacja full-stack pozwalająca na 
zarządzanie projektami w metodologiach Agile i Kanban.

## Stos technologiczny
- Java 17
- Spring Framework 5 (Spring Boot, Spring Security, Spring Data JPA)
- Flyway
- MapStruct
- TypeScript
- React 18
- Redux
- PostgreSQL 14

## Wymagane do uruchomienia (w przypadku nie używania Docker)

- JDK v >= 17
- Node.js v >= 16.13
- PostgreSQL 14

## Instalacja i uruchomienie środowiska deweloperskiego
### 0. Przed uruchomieniem

- Zsynchronizować zależności Maven w katalogu głównym
- W katalogu `frontend` uruchomić komendę `npm install`
- W katalogu `src/main/resources` stworzyć plik `config.properties` na podstawie pliku przykładowego
`example_config.properties`, i uzupełnić prawidłowymi danymi.

### 1. Docker
- Z pliku `config.properties` usunąć linie `spring.datasource.url`, `spring.datasource.username`, 
`spring.datasource.password` i `spring.jpa.hibernate.ddl-auto`. Właściwości te są wprowadzane jako zmienne
środowiskowe Dockera.
- W katalogu głównym uruchomić komendę `docker-compose build`, a następnie `docker-compose up`
- Zarówno frontend jak i backend powinny być uruchomione, można korzystać z aplikacji pod adresem `http://localhost:3000`,
backend jest dostępny pod adresem `http://localhost:8080`

### 2. Bez Dockera
#### 2.1 Backend
- W katalogu głównym uruchomić komendę `./mvnw clean install` (Unix) lub `./mvnw.cmd clean install` (Windows) - sprawdzi poprawność oraz
przeprowadzi instalację i wstępną kompilację. 
- Jeżeli poprzednia komenda zadziałała poprawnie, należy uruchomić `./mvnw spring-boot:run`, aby uruchomić właściwą aplikację.
Będzie działać pod adresem `http://localhost:8080`

#### 2.2 Frontend
- W katalogu `./frontend` należy uruchomić komendę `npm start`, po chwili
frontend powinien być dostępny pod adresem `http://localhost:3000`.
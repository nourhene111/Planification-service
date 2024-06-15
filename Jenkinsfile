pipeline {
    agent any

    environment {
        DOCKER_PATH = "C:\\Programmes\\Docker\\cli-plugins"
        PATH = "${DOCKER_PATH}:${PATH}"
       
        NODEJS_PATH = "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\Node.js"
        SONAR_SCANNER_HOME = "C:\\Users\\MSAR\\Desktop\\sonar-scanner-5.0.1.3006-windows"
    }

    stages {
        stage('Install Dependencies and Run Tests') {
            steps {
                script {
                    bat 'npm install'
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    bat 'docker build -t nourhene112/planification-service1:latest .'
                }
            }
        }
        
        stage('Publish Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', '12') {
                        docker.image('nourhene112/planification-service1:latest').push()
                    }
                }
            }
        }
    }
}

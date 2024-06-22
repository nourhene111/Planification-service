pipeline {
    agent any

    environment {
        DOCKER_PATH = "C:\\Programmes\\Docker\\cli-plugins"
        KUBECONFIG = "C:\\Program Files\\Jenkins\\.kube\\config"
        PATH = "${DOCKER_PATH};${env.PATH}"
        NODEJS_PATH = "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\Node.js"
        SONAR_SCANNER_HOME = "C:\\Users\\MSAR\\Desktop\\sonar-scanner-5.0.1.3006-windows"
    }

    stages {
        stage('Authenticate Docker') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub_id', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                        bat 'docker login -u %DOCKERHUB_USERNAME% -p %DOCKERHUB_PASSWORD%'
                    }
                }
            }
        }
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
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub_id') {
                        bat 'docker push nourhene112/planification-service1:latest'
                    }
                }
            }
        }
        stage('Deploy with kubectl') {
            steps {
                script {
                    bat '''
                    kubectl get namespace planification || kubectl create namespace planification
                    kubectl apply -f db/config.yml -n planification
                    kubectl apply -f db/mysqldeployment.yml -n planification
                    kubectl apply -f db/persistant.yml -n planification
                    kubectl apply -f deploy.yml -n planification
                    '''
                }
            }
        }
    }
}

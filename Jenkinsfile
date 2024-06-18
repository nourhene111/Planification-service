pipeline {
    agent any

    environment {
        DOCKER_PATH = "C:\\Programmes\\Docker\\cli-plugins"
        KUBECONFIG = "C:\\Program Files\\Jenkins\\.kube\\config"
        PATH = "${DOCKER_PATH};${PATH}"
        NODEJS_PATH = "C:\\Program Files\\nodejs"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
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
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-credentials-id') {
                        docker.image('nourhene112/planification-service1:latest').push()
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
                    kubectl apply -f db/persistent.yml -n planification
                    kubectl apply -f deploy.yml -n planification
                    '''
                }
            }
        }
    }
  

    post {
        always {
            cleanWs()
        }
    }
}

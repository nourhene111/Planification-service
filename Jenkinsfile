pipeline {
    agent any

    environment {
        DOCKER_PATH = "C:\\Programmes\\Docker\\cli-plugins"
        KUBECONFIG = "C:\\Program Files\\Jenkins\\.kube\\config"
        PATH = "${DOCKER_PATH};${PATH}"
        NODEJS_PATH = "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\Node.js"
        // Le scanner SonarQube sera installé automatiquement via Jenkins
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

        stage('SonarQube Analysis') {
            environment {
                scannerHome = tool name: 'SonarQube Scanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
            }
            steps {
                script {
                    withSonarQubeEnv('SonarQube') {
                        bat """
                        ${scannerHome}/bin/sonar-scanner \
                          -Dsonar.projectKey=my_project_key \
                          -Dsonar.sources=. \
                          -Dsonar.host.url=http://http://localhost:9000/\
                          -Dsonar.login=ysqa_c37f8c300599e0bc8c6ae7db45f8dc40db9abb0b
                        """
                    }
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

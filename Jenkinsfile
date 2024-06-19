pipeline {
    agent any

    environment {
        DOCKER_PATH = "C:\\Programmes\\Docker\\cli-plugins"
        KUBECONFIG = "C:\\Program Files\\Jenkins\\.kube\\config"
        PATH = "${DOCKER_PATH};${PATH}"
        NODEJS_PATH = "C:\\Program Files\\nodejs"
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
            // Définition de l'environnement SonarQube scanner
            environment {
                scannerHome = tool name: 'SonarQube Scanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
            }
            steps {
                script {
                    withSonarQubeEnv('SonarQube') {
                        bat """
                        ${scannerHome}\\bin\\sonar-scanner \
                          -Dsonar.projectKey=my_project_key \
                          -Dsonar.sources=. \
                          -Dsonar.host.url=http://localhost:9000 \
                          -Dsonar.login=sqa_e3d08a92c1a464cbdbc7f2fd2af784318b2285a7
                        """
                    }
                }
            }
        }

        stage('Publish Docker Image') {
            steps {
                script {
                    // Utilisation des informations d'identification Docker
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

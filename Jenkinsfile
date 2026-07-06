pipeline {

agent any

options {
    buildDiscarder(
        logRotator(
            numToKeepStr: '20'
        )
    )
}

environment {
    IMAGE_NAME = "girish8764/omega-restaurant-backend"
    APP_SERVER = "3.111.217.20"
}

stages {

    stage('Checkout') {

        steps {

            git branch: 'master',
                url: 'https://github.com/Girish8764/restaurant-backend.git'

        }
    }

    stage('SonarQube Analysis') {

        steps {

            script {

                def scannerHome = tool 'sonar-scanner'

                withSonarQubeEnv('SONAR') {

                    sh """
                    ${scannerHome}/bin/sonar-scanner
                    """

                }

            }

        }

    }

    stage('Quality Gate') {

        steps {

            timeout(time: 5, unit: 'MINUTES') {

                waitForQualityGate abortPipeline: true

            }

        }

    }

    stage('Trivy FS Scan') {

    steps {

        sh '''
        trivy fs \
        --severity CRITICAL \
        --exit-code 1 \
        .
        '''

    }

}

    stage('Build Image') {

        steps {

            sh '''
            docker build \
            -t $IMAGE_NAME:latest \
            -t $IMAGE_NAME:${BUILD_NUMBER} .
            '''
        }

    }

    stage('Trivy Image Scan') {

    steps {

        sh '''
        trivy image \
        --severity CRITICAL \
        --exit-code 1 \
        $IMAGE_NAME:${BUILD_NUMBER}
        '''

    }

}

    stage('Push Image') {

        steps {

            withCredentials([
                usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )
            ]) {

                sh '''
                echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin

                docker push $IMAGE_NAME:latest
                docker push $IMAGE_NAME:${BUILD_NUMBER}
                '''

            }

        }

    }

    stage('Deploy Backend') {

        steps {

            sshagent(['ec2-ssh-key']) {

                sh '''
                ssh -o StrictHostKeyChecking=no ubuntu@$APP_SERVER "

                cd /node

                docker compose pull backend

                docker compose up -d backend

                docker image prune -f

                "
                '''

            }

        }

    }

    stage('Health Check') {

        steps {

            sshagent(['ec2-ssh-key']) {

                sh '''
                ssh -o StrictHostKeyChecking=no ubuntu@$APP_SERVER "

                curl -f http://localhost:5000/health

                "
                '''

            }

        }

    }

}

post {

    always {

        sh '''
        docker rmi $IMAGE_NAME:${BUILD_NUMBER} || true
        docker rmi $IMAGE_NAME:latest || true
        docker image prune -f
        '''

        cleanWs()

    }

}

}



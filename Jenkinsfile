pipeline {

```
agent any

environment {
    IMAGE_NAME = "girish8764/omega-restaurant-backend"
    APP_SERVER = "65.0.199.3"
}

stages {

    stage('Checkout') {

        steps {

            git branch: 'main',
                url: 'https://github.com/Girish8764/restaurant-backend.git'

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
```

}


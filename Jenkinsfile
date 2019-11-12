node {
    def clusterName = 'e2e-testing'

    def BRANCH="master"
    def PROJECT_NAME="iq-online-public-master"
    def DEPLOY_S3_BUCKET="s3://${PROJECT_NAME}"
    def DEPLOY_S3_REGION="eu-west-1"
    def DEPLOY_PATH="dist"
    def DEPLOY_S3_FOLDER="${PROJECT_NAME}"
    def DEPLOY_S3_URL="http://${DEPLOY_S3_FOLDER}.s3-website-eu-west-1.amazonaws.com"
    def jenkinsUID = sh(returnStdout: true, script: "id -u jenkins | tr -d '\n'")
    def jenkinsGID = sh(returnStdout: true, script: "id -g jenkins | tr -d '\n'")

    def testsOK = false
    
    stage('Checkout') {
        checkout scm
    }

    try {
        stage('Create e2e cluster') {
            build job: 'e2e-cluster-start', parameters: [string(name: 'cluster', value:clusterName)]
        }

        env.NODEJS_HOME = "${tool 'Node-10.13.0'}"
        env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"
        
        stage('Prepare Nodejs') {
            println "Installing dependencies..."
            sh "npm install"
            println "Dependencies installed"
        }

        stage('Build Tests') {
            println "Building tests"
            sh "npm run build -- --configuration=e2e"
        }

        docker.build('cypress-image', '-f ./ci/Dockerfile-cypress ./ci').inside('-u root -v /var/lib/jenkins/.cache:/root/.cache') {
            stage('Run Tests') {
                sh "http-server dist -p 4200 &"
                sh "wait-on http://localhost:4200"
                sh "DEBUG=cypress:launcher node ./cypress/scripts/test.js --browser electron"
                testsOK = true
                println "Tests passed"
                sh "chown -R ${jenkinsUID}:${jenkinsGID} cypress"
            }
        }
    } finally {
        stage('Delete cluster') {
            build job: 'e2e-cluster-finish', parameters: [string(name: 'cluster', value:clusterName)]
        }
    }

    if (testsOK) {
        stage('Build Staging') {
            println "Building for Staging..."
            sh "npm run build -- --configuration=master"
        }

        stage('Deploy Staging') {
            println "Deploying in Staging..."
            withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'AWS', accessKeyVariable: 'AWS_ACCESS_KEY_ID', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
                sh "aws s3 sync ${DEPLOY_PATH} ${DEPLOY_S3_BUCKET} --delete --acl public-read --region ${DEPLOY_S3_REGION}"
                sh "aws s3api copy-object --copy-source ${DEPLOY_S3_FOLDER}/index.html --key index.html --bucket ${DEPLOY_S3_FOLDER} --cache-control 'no-cache' --metadata-directive 'REPLACE' --acl 'public-read' --content-type 'text/html'"
                sh "aws s3 sync cypress/videos ${DEPLOY_S3_BUCKET}/integration/videos --delete --acl public-read --region ${DEPLOY_S3_REGION}"
                sh "aws s3 cp mochawesome-report/belike-combined.html ${DEPLOY_S3_BUCKET} --acl public-read"
                sh "find cypress/videos -name \\*.mp4 -printf '%P\\n' > videos-list.txt"
                sh "aws s3 cp videos-list.txt ${DEPLOY_S3_BUCKET} --acl public-read"
            }
        }

        // stage('Build Pro') {
        //     input "Continue build for production?"
        //     println "Building for Pro..."
        //     sh "npm run build -- --prod"
        //     println "Built for Pro"
        // }

        // stage('Deploy Pro') {
        //     println "Deploying in Pro..."
        //     println "Deployed in Pro"
        // }
    }
}
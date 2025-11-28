pipeline {
   agent any
   stages {
      stage('e2e-tests') {
        nodejs('NodeJS2290'){ 
        steps {
            sh 'npm ci'
            sh 'npm playwright install --with-deps'
            sh 'npx playwright test'
         }
        }
      }
   }
}

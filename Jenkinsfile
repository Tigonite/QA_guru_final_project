pipeline {
   agent any
   stages {
      stage('e2e-tests') { 
        steps {
            nodejs('NodeJS2290'){
            sh 'npm ci'
            sh 'npm playwright install --with-deps'
            sh 'npx playwright test'
         }
        }
      }
   }
}

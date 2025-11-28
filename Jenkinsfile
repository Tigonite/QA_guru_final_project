pipeline {
   agent any
   stages {
      stage('e2e-tests') { 
        steps {
            nodejs('NodeJS2400'){
            sh 'npm ci'
            sh 'npx playwright install --with-deps'
            sh 'npx playwright test'
         }
        }
      }
   }
}

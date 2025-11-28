pipeline {
   agent any
   stages {
      stage('e2e-tests') { 
        steps {
            nodejs('NodeJS2290'){
            sh 'npm ci'
            sh 'npx playwright install --with-deps'
            sh 'npx playwright test'
         }
        }
      }
      stage('Allure'){
         steps {
            allure(
               [
                  reportBuildPolicy:'ALWAYS'
                  results:[[ path:'allure-results']]
               ]
            )
         }
      }
   }
}

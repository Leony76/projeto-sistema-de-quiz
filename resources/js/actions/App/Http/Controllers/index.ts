import QuizController from './QuizController'
import QuestionController from './QuestionController'
import Settings from './Settings'
const Controllers = {
    QuizController: Object.assign(QuizController, QuizController),
QuestionController: Object.assign(QuestionController, QuestionController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers
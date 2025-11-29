import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\QuizController::save
 * @see app/Http/Controllers/QuizController.php:13
 * @route '/quiz/save'
 */
export const save = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: save.url(options),
    method: 'post',
})

save.definition = {
    methods: ["post"],
    url: '/quiz/save',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\QuizController::save
 * @see app/Http/Controllers/QuizController.php:13
 * @route '/quiz/save'
 */
save.url = (options?: RouteQueryOptions) => {
    return save.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\QuizController::save
 * @see app/Http/Controllers/QuizController.php:13
 * @route '/quiz/save'
 */
save.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: save.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\QuizController::save
 * @see app/Http/Controllers/QuizController.php:13
 * @route '/quiz/save'
 */
    const saveForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: save.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\QuizController::save
 * @see app/Http/Controllers/QuizController.php:13
 * @route '/quiz/save'
 */
        saveForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: save.url(options),
            method: 'post',
        })
    
    save.form = saveForm
/**
* @see \App\Http\Controllers\QuizController::userstats
 * @see app/Http/Controllers/QuizController.php:32
 * @route '/quiz/userstats'
 */
export const userstats = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: userstats.url(options),
    method: 'get',
})

userstats.definition = {
    methods: ["get","head"],
    url: '/quiz/userstats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\QuizController::userstats
 * @see app/Http/Controllers/QuizController.php:32
 * @route '/quiz/userstats'
 */
userstats.url = (options?: RouteQueryOptions) => {
    return userstats.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\QuizController::userstats
 * @see app/Http/Controllers/QuizController.php:32
 * @route '/quiz/userstats'
 */
userstats.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: userstats.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\QuizController::userstats
 * @see app/Http/Controllers/QuizController.php:32
 * @route '/quiz/userstats'
 */
userstats.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: userstats.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\QuizController::userstats
 * @see app/Http/Controllers/QuizController.php:32
 * @route '/quiz/userstats'
 */
    const userstatsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: userstats.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\QuizController::userstats
 * @see app/Http/Controllers/QuizController.php:32
 * @route '/quiz/userstats'
 */
        userstatsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: userstats.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\QuizController::userstats
 * @see app/Http/Controllers/QuizController.php:32
 * @route '/quiz/userstats'
 */
        userstatsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: userstats.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    userstats.form = userstatsForm
/**
* @see \App\Http\Controllers\QuizController::allResults
 * @see app/Http/Controllers/QuizController.php:88
 * @route '/quiz/all-results'
 */
export const allResults = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: allResults.url(options),
    method: 'get',
})

allResults.definition = {
    methods: ["get","head"],
    url: '/quiz/all-results',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\QuizController::allResults
 * @see app/Http/Controllers/QuizController.php:88
 * @route '/quiz/all-results'
 */
allResults.url = (options?: RouteQueryOptions) => {
    return allResults.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\QuizController::allResults
 * @see app/Http/Controllers/QuizController.php:88
 * @route '/quiz/all-results'
 */
allResults.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: allResults.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\QuizController::allResults
 * @see app/Http/Controllers/QuizController.php:88
 * @route '/quiz/all-results'
 */
allResults.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: allResults.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\QuizController::allResults
 * @see app/Http/Controllers/QuizController.php:88
 * @route '/quiz/all-results'
 */
    const allResultsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: allResults.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\QuizController::allResults
 * @see app/Http/Controllers/QuizController.php:88
 * @route '/quiz/all-results'
 */
        allResultsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: allResults.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\QuizController::allResults
 * @see app/Http/Controllers/QuizController.php:88
 * @route '/quiz/all-results'
 */
        allResultsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: allResults.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    allResults.form = allResultsForm
/**
* @see \App\Http\Controllers\QuestionController::questions
 * @see app/Http/Controllers/QuestionController.php:10
 * @route '/quiz/questions'
 */
export const questions = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: questions.url(options),
    method: 'get',
})

questions.definition = {
    methods: ["get","head"],
    url: '/quiz/questions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\QuestionController::questions
 * @see app/Http/Controllers/QuestionController.php:10
 * @route '/quiz/questions'
 */
questions.url = (options?: RouteQueryOptions) => {
    return questions.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\QuestionController::questions
 * @see app/Http/Controllers/QuestionController.php:10
 * @route '/quiz/questions'
 */
questions.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: questions.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\QuestionController::questions
 * @see app/Http/Controllers/QuestionController.php:10
 * @route '/quiz/questions'
 */
questions.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: questions.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\QuestionController::questions
 * @see app/Http/Controllers/QuestionController.php:10
 * @route '/quiz/questions'
 */
    const questionsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: questions.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\QuestionController::questions
 * @see app/Http/Controllers/QuestionController.php:10
 * @route '/quiz/questions'
 */
        questionsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: questions.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\QuestionController::questions
 * @see app/Http/Controllers/QuestionController.php:10
 * @route '/quiz/questions'
 */
        questionsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: questions.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    questions.form = questionsForm
const quiz = {
    save: Object.assign(save, save),
userstats: Object.assign(userstats, userstats),
allResults: Object.assign(allResults, allResults),
questions: Object.assign(questions, questions),
}

export default quiz
import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
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
* @see \App\Http\Controllers\QuizController::listUserStats
 * @see app/Http/Controllers/QuizController.php:32
 * @route '/quiz/userstats'
 */
export const listUserStats = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: listUserStats.url(options),
    method: 'get',
})

listUserStats.definition = {
    methods: ["get","head"],
    url: '/quiz/userstats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\QuizController::listUserStats
 * @see app/Http/Controllers/QuizController.php:32
 * @route '/quiz/userstats'
 */
listUserStats.url = (options?: RouteQueryOptions) => {
    return listUserStats.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\QuizController::listUserStats
 * @see app/Http/Controllers/QuizController.php:32
 * @route '/quiz/userstats'
 */
listUserStats.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: listUserStats.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\QuizController::listUserStats
 * @see app/Http/Controllers/QuizController.php:32
 * @route '/quiz/userstats'
 */
listUserStats.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: listUserStats.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\QuizController::listUserStats
 * @see app/Http/Controllers/QuizController.php:32
 * @route '/quiz/userstats'
 */
    const listUserStatsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: listUserStats.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\QuizController::listUserStats
 * @see app/Http/Controllers/QuizController.php:32
 * @route '/quiz/userstats'
 */
        listUserStatsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: listUserStats.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\QuizController::listUserStats
 * @see app/Http/Controllers/QuizController.php:32
 * @route '/quiz/userstats'
 */
        listUserStatsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: listUserStats.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    listUserStats.form = listUserStatsForm
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
const QuizController = { save, listUserStats, allResults }

export default QuizController
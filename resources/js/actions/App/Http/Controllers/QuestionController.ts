import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\QuestionController::index
 * @see app/Http/Controllers/QuestionController.php:10
 * @route '/quiz/questions'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/quiz/questions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\QuestionController::index
 * @see app/Http/Controllers/QuestionController.php:10
 * @route '/quiz/questions'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\QuestionController::index
 * @see app/Http/Controllers/QuestionController.php:10
 * @route '/quiz/questions'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\QuestionController::index
 * @see app/Http/Controllers/QuestionController.php:10
 * @route '/quiz/questions'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\QuestionController::index
 * @see app/Http/Controllers/QuestionController.php:10
 * @route '/quiz/questions'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\QuestionController::index
 * @see app/Http/Controllers/QuestionController.php:10
 * @route '/quiz/questions'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\QuestionController::index
 * @see app/Http/Controllers/QuestionController.php:10
 * @route '/quiz/questions'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
const QuestionController = { index }

export default QuestionController
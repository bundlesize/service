import lodashMerge from 'lodash.merge'
import jsonpack from 'jsonpack/main'
import shortenURL from './shortenURL'

const createURL = async ({
    results,
    bundlewatchServiceHost,
    repoOwner,
    repoName,
    repoCurrentBranch,
    repoBranchBase,
    commitSha,
}) => {
    const strippedResultsForURL = lodashMerge({}, results)
    strippedResultsForURL.fullResults.map(result => {
        const strippedResult = result
        delete strippedResult.message
        return strippedResult
    })

    const packedJSON = jsonpack.pack({
        details: {
            repoOwner,
            repoName,
            repoCurrentBranch,
            repoBranchBase,
            commitSha,
        },
        results: strippedResultsForURL,
    })
    const urlResultData = encodeURIComponent(packedJSON)
    const longURL = `${bundlewatchServiceHost}/results?d=${urlResultData}`
    return shortenURL(longURL)
}

export default createURL

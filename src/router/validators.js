import Joi from 'joi'

export const createStoreSchema = Joi.object().keys({
    commitSha: Joi.string().required(),
    githubAccessToken: Joi.string().required(),
    repoBranch: Joi.string().required(),
    repoName: Joi.string().required(),
    repoOwner: Joi.string().required(),
    fileDetailsByPath: Joi.object({
        filePath: Joi.object(),
    })
        .pattern(
            /.+/,
            Joi.object({
                compression: Joi.string().required(),
                maxSize: Joi.number().required(),
                size: Joi.number().required(),
            }),
        )
        .required(),
})

export const lookupStoreSchema = Joi.object().keys({
    commitSha: Joi.string().required(),
    githubAccessToken: Joi.string().required(),
    repoBranch: Joi.string().required(),
    repoName: Joi.string().required(),
    repoOwner: Joi.string().required(),
})

export const githubTokenSchema = Joi.object().keys({
    code: Joi.string().optional(),
})

const detailsSchema = Joi.object()
    .keys({
        commitSha: Joi.string().optional(),
        repoBranchBase: Joi.string().optional(),
        repoCurrentBranch: Joi.string().optional(),
        repoName: Joi.string().optional(),
        repoOwner: Joi.string().optional(),
    })
    .required()

const fullResultItemSchema = Joi.object().keys({
    baseBranchSize: Joi.number().optional(),
    compression: Joi.string().optional(),
    filePath: Joi.string().required(),
    maxSize: Joi.number().optional(),
    message: Joi.string().optional(),
    size: Joi.number().optional(),
    status: Joi.string().required(),
})

const resultsSchema = Joi.object()
    .keys({
        fullResults: Joi.array()
            .items(fullResultItemSchema)
            .required(),
        status: Joi.string().required(),
        summary: Joi.string().required(),
    })
    .required()

export const unpackedJsonSchema = Joi.object().keys({
    details: detailsSchema,
    results: resultsSchema,
})

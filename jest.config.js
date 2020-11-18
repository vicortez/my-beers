module.exports =
{
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "setupFilesAfterEnv": [
        "./setupTests.ts"
    ],
    "snapshotSerializers": [
        "enzyme-to-json/serializer"
    ],
    "collectCoverageFrom": [
        "packages/*/src/**/*.{js,jsx,ts,tsx}"
    ]

}
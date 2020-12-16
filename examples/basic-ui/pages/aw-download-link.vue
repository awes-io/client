<template>
    <AwPage :title="headline">
        <AwGrid :col="{ xs: 2, md: 7 }">
            <AwInfo v-for="file in files" :key="file.href" :label="file.type">
                <AwDownloadLink
                    :href="file.href"
                    :file-type="file.type"
                    text="Download file"
                />
            </AwInfo>

            <AwInfo label="test">
                <AwDownloadLink
                    href="https://file-examples-com.github.io/uploads/2017/10/file-example_PDF_1MB.pdf"
                    text="Download file"
                >
                    <template #icon>
                        <AwIcon name="fas fa-bed" class="mr-1" />
                    </template>
                </AwDownloadLink>
            </AwInfo>

            <AwInfo label="test">
                <AwDownloadLink
                    href="https://file-examples-com.github.io/uploads/2017/10/file-example_PDF_1MB.pdf"
                    text="Download file"
                >
                    <template #icon>
                        <AwIcon name="fas fa-user-circle" />
                    </template>
                </AwDownloadLink>
            </AwInfo>
        </AwGrid>

        <AwCodeSnippet v-text="code" class="mt-8 shadow" :size="50" />

        <h3 class="h3">Buttons</h3>

        <AwGrid :col="{ xs: 2, md: 7 }">
            <AwInfo v-for="file in files" :key="file.href" :label="file.type">
                <AwDownloadLink
                    :href="file.href"
                    :file-type="file.type"
                    is-button
                />
            </AwInfo>

            <AwInfo label="test">
                <AwDownloadLink
                    href="https://file-examples-com.github.io/uploads/2017/10/file-example_PDF_1MB.pdf"
                    text="Download file"
                    is-button
                >
                    <template #icon>
                        <AwIcon name="fas fa-bed" class="mr-1 w-5" />
                    </template>
                </AwDownloadLink>
            </AwInfo>

            <AwInfo label="test">
                <AwDownloadLink
                    href="https://file-examples-com.github.io/uploads/2017/10/file-example_PDF_1MB.pdf"
                    text="Download file"
                    is-button
                >
                    <template #icon>
                        <AwIcon name="fas fa-user-circle" class="mr-1 w-5" />
                    </template>
                </AwDownloadLink>
            </AwInfo>
        </AwGrid>

        <AwCodeSnippet v-text="codeButton" class="mt-8 shadow" :size="50" />

        <h3 class="h3">Accepted file types</h3>

        <ul>
            <li>pdf</li>
            <li>xls</li>
            <li>xlsx</li>
            <li>doc</li>
            <li>docx</li>
            <li>jpeg</li>
            <li>jpg</li>
            <li>png</li>
            <li>svg</li>
            <li>csv</li>
        </ul>
    </AwPage>
</template>

<script>
export default {
    name: 'DownloadLink',

    data() {
        return {
            title: 'AwDownloadLink',
            headline: this._getTitle('AwDownloadLink'),
            files: [
                {
                    href:
                        'https://file-examples-com.github.io/uploads/2017/10/file-example_PDF_1MB.pdf',
                    type: 'pdf'
                },
                {
                    href:
                        'https://file-examples-com.github.io/uploads/2017/02/file-sample_100kB.doc',
                    type: 'doc'
                },
                {
                    href:
                        'https://file-examples-com.github.io/uploads/2017/02/file-sample_500kB.docx',
                    type: 'docx'
                },
                {
                    href:
                        'https://file-examples-com.github.io/uploads/2017/02/file_example_XLS_5000.xls',
                    type: 'xls'
                },
                {
                    href:
                        'https://file-examples-com.github.io/uploads/2017/02/file_example_XLSX_5000.xlsx',
                    type: 'xlsx'
                },
                {
                    href:
                        'https://file-examples-com.github.io/uploads/2017/10/file_example_JPG_2500kB.jpg',
                    type: 'jpg'
                },
                {
                    href:
                        'https://file-examples-com.github.io/uploads/2017/10/file_example_PNG_3MB.png',
                    type: 'png'
                },
                {
                    href:
                        'https://file-examples-com.github.io/uploads/2017/02/file_example_CSV_5000.csv',
                    type: 'csv'
                }
            ]
        }
    },

    computed: {
        code() {
            const arr = [
                '<AwDownloadLink',
                '    href="https://file-examples-com.github.io/uploads/2017/02/file-sample_100kB.doc"',
                '    file-type="doc"',
                '    text="Download file"',
                '/>'
            ]
            return arr.join('\n')
        },

        codeButton() {
            const arr = [
                '<AwDownloadLink',
                '    is-button',
                '    href="https://file-examples-com.github.io/uploads/2017/02/file-sample_100kB.doc"',
                '    file-type="doc"',
                '/>'
            ]
            return arr.join('\n')
        }
    },

    head() {
        return {
            title: this._getMetaTitle(this.title),
            meta: [this._getMetaDescription(this.title)]
        }
    }
}
</script>

<style></style>

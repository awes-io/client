<template>
    <AwPage :title="headline">
        <AwGrid :col="{ md: 5 }">
            <AwInfo label="Doc">
                <AwDownloadLink
                    href="https://file-examples-com.github.io/uploads/2017/02/file-sample_100kB.doc"
                    type-file="doc"
                />
            </AwInfo>

            <AwInfo label="Docx">
                <AwDownloadLink
                    href="https://file-examples-com.github.io/uploads/2017/02/file-sample_500kB.docx"
                    type-file="docx"
                />
            </AwInfo>

            <AwInfo label="xls">
                <AwDownloadLink
                    href="https://file-examples-com.github.io/uploads/2017/02/file_example_XLS_5000.xls"
                    type-file="xls"
                />
            </AwInfo>

            <AwInfo label="xlsx">
                <AwDownloadLink
                    href="https://file-examples-com.github.io/uploads/2017/02/file_example_XLSX_5000.xlsx"
                    type-file="xlsx"
                />
            </AwInfo>

            <AwInfo label="jpg">
                <AwDownloadLink
                    href="https://file-examples-com.github.io/uploads/2017/10/file_example_JPG_2500kB.jpg"
                    type-file="jpg"
                />
            </AwInfo>

            <AwInfo label="png">
                <AwDownloadLink
                    href="https://file-examples-com.github.io/uploads/2017/10/file_example_PNG_3MB.png"
                    type-file="png"
                />
            </AwInfo>
        </AwGrid>
    </AwPage>
</template>

<script>
export default {
    name: 'DownloadLink',

    data() {
        return {
            title: 'AwDownloadLink',
            headline: this._getTitle('AwDownloadLink')
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

export default {
    props: ['info'],
    template: `
        <section class="note-video">
            <p contenteditable >{{info.txt}}</p>
            <iframe v-if="info.vidUrl.includes('youtube')" :src="info.vidUrl" frameborder="0"></iframe>
            <video controls v-if="!info.vidUrl.includes('youtube')" :src="info.vidUrl" type="video/mp4"></video>
        </section>
    `,
}
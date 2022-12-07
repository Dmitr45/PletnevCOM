export const server = (done) =>{
    app.plugins.browsersync.init({
       server: {
           baseDir: `${app.path.build.html}`
       },
        notify: false, // убираем сообщения в браузере, чтобы не мешали
        port: 3000,
    });
}
requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        app: '../app'
    },
    shim: {
        three: {
            exports: 'THREE'
        }
    }
});

requirejs(['app/main']);
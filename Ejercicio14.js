class Ejercicio14 {

    constructor() {
        navigator.geolocation.getCurrentPosition(this.previo.bind(this), this.verErrores.bind(this));
        this.aux = false;
        this.copiado = false;
        this.guardadoAux=false;
        this.contarVeces();
    }

    previo(p) {
        this.posicion = p;
        $("main").append("<p>Su ubicación: " + this.posicion.coords.longitude + ", " + this.posicion.coords.latitude + "</p>");
        this.aux = true;

    }

    contarVeces() {
        if (localStorage.veces) {
            localStorage.veces = Number(localStorage.veces) + 1;
        } else {
            localStorage.veces = 1;
        }
        $("main").append("<p>Ha visitado la página "+localStorage.veces+" veces</p>");
    }

    borrar(){
        localStorage.clear();
    }

    guardar(){
        if(localStorage.guardado){
            localStorage.guardado = document.getElementsByTagName("input")[0].value;
        }
        else{
            localStorage.guardado = document.getElementsByTagName("input")[0].value;
        }
    }

    verErrores(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                this.mensaje = "<p>El usuario no permite la petición de geolocalización</p>"
                break;
            case error.POSITION_UNAVAILABLE:
                this.mensaje = "<p>Información de geolocalización no disponible</p>"
                break;
            case error.TIMEOUT:
                this.mensaje = "<p>La petición de geolocalización ha caducado</p>"
                break;
            case error.UNKNOWN_ERROR:
                this.mensaje = "<p>Se ha producido un error desconocido</p>"
                break;
        }
        $(this.mensaje).appendTo("main");
    }

    copiarCoordenadas() {
        if (this.aux) {
            navigator.clipboard.writeText(this.posicion.coords.longitude + ", " + this.posicion.coords.latitude);
        }
        else if (this.copiado == false) {
            $("main").append("<p>No se ha podido copiar por error de geolocalizacion</p>");
            this.copiado = true;
        }
    }

    copiarGuardado(){
        if(localStorage.guardado){
            navigator.clipboard.writeText(localStorage.guardado);
        }
        else if(this.guardadoAux){
            $("main").append("<p>No se puede copiar porque no tiene nada guardado</p>");
            this.guardadoAux = false;
        }
    }

    pantallaCompleta() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }

}
var ej14 = new Ejercicio14();
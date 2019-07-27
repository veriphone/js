function Veriphone(input){
    this.regex = /^([+]{1}[0-9]{1})?([\s0-9-\(\)]{5,18})$/;
    this.input = $(input);
    this.input.attr("spellcheck","false");
    this.key = this.input.attr("data-key");
    this.example = this.input.attr("data-example");
    this.delay = Number(this.input.attr("data-delay")) || 200;
    this.retries = Number(this.input.attr("data-retries")) || 3;
    this.retry = 0;
    this.cache = {};
    this.verify = function(){
        if(this.cache.hasOwnProperty(this.value)){
            this.handler(this.cache[this.value]);
        }else{
            clearTimeout(this.timeout);
            this.timeout = setTimeout(this._verify.bind(this),this.delay);
        }
    };
    this._verify = function(){
        var data = {phone: this.value};
        if(this.key) data.key = this.key;
        $.ajax({
            url: "https://api.veriphone.io/v1/verify",
            data: data,
            success: this.handler.bind(this),
            error: this.error.bind(this),
            dataType: "json",
            type: "POST",
            crossDomain: true
        });
    };
    this.handler = function(rs){
        if(rs.status == "success"){
            if(rs.phone != this.value) return;
            this.cache[rs.phone] = rs;
            this.retry = 0;
            var event = jQuery.Event("verify");
            for(var p in rs) event[p]=rs[p];
            this.input.trigger(event);
            var attr = {};
            for(var p in rs) attr["data-"+p]=rs[p];
            this.input.attr(attr);
            if(rs.phone_valid){
                this.input.addClass("valid").removeClass("not-valid");
                this.input.val(rs.international_number);
            }else{
                this.input.addClass("not-valid").removeClass("valid");
            }
        }else if(this.retry < this.retries){
            this.retry++;
            this._verify();
        }
    };
    this.error = function (jqXHR, textStatus, errorThrown) {
        this.input.trigger({type: "error",jqXHR: jqXHR,textStatus: textStatus, errorThrown: errorThrown});
    };
    this.input.attr("data-value",this.input.val());
    this.change = function(){
        var newval =this.input.val();
        var preval = this.input.attr("data-value");
        if(preval == newval) return;
        this.input.attr("data-value", newval);

        this.value = newval;
        if(this.regex.test(newval)){
            this.verify();
        }else{
            this.handler({status: "success",phone: newval,phone_valid: false,phone_type: "",phone_region: "",country: "",country_code: "",country_prefix: "",international_number: "",local_number: "",carrier: ""});
            
        }
    }
    this.input.on("change keyup input paste", this.change.bind(this));
    this.setExample = function(rs){
        if(rs.status == "success" && this.input.val() == ""){
            this.input.attr("placeholder",rs.international_number);
        }
    }
    if(this.example != "false"){    
        $.ajax({
            url: "https://api.veriphone.io/v1/example",
            success: this.setExample.bind(this),
            error: this.error.bind(this),
            dataType: "json",
            type: "POST",
            crossDomain: true
        });
    }
}
$(function(){
    $(".veriphone").each(function(index){
        window["veriphone-"+index] = new Veriphone(this);
    });
});
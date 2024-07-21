const Command = require ("../structs/Command.js");

module.exports = new Command({
        name: "roll",
        alias: [],
        description: "rng; you choose the max. (default max=100, floor)",
        
        async run(message,args,client){
            const tmp=args.slice(1).join(" ");
            const restype = args.slice(2).join(" "); 
            const n = tmp.substr(0,tmp.length-restype.length);
            if (Number(n)<1 && n != "") {message.channel.send("invalid max, please check your input");}
            else {
                if (tmp==null) {var max = 100;}
                else var max = Number(n);
                var res = (Math.random()*max)+1;
                if ( restype == "precise" ) {message.channel.send(String(res));}
                else {res = Math.floor(res); message.channel.send(String(res));}
                
        }
    }
})

const socket = new WebSocket("wss://a1xnc0liqh.execute-api.us-east-1.amazonaws.com/production");
const room_id = window.location.href.split('/')[3];
socket.onopen = () => {

    const timestamp = Date.now();
    console.log("Overseer: injected " + timestamp);
    let socketPoll = setInterval(() => {
        if (socket.readyState == WebSocket.OPEN) {
            console.log("Overseer: remote socket available");
            socket.send(overseer_session_id + "," + "link_access" + "," + timestamp + "," + room_id);
            clearInterval(socketPoll);
            return;
        }
        console.log("Overseer: waiting to open the socket");
    }, 100)

    const overseer_session_id = navigator.userAgentData.platform + "_" + Math.round(Math.random() * 1000)
    console.log("Overseer: room accessed " + timestamp);
    let joinRoomPoll = setInterval(
        () => {
            let buttons = [...document.getElementsByClassName("TextInput__button__1ue_9")];
            if (!buttons.length) {
                const timestamp = Date.now();
                const loading_progress = document.getElementsByClassName("LoadingScreenLayout__center__GIcnI")[0].innerText
                console.log("Overseer: " + loading_progress);
                socket.send(overseer_session_id + "," + "loading_progress (" + loading_progress + ")," + timestamp + "," + room_id)
                return;
            }
            buttons.forEach((b) => {
                if (b.innerText == "Join Room") {
                    const timestamp = Date.now();
                    console.log("Overseer: joined the room " + timestamp);
                    socket.send(overseer_session_id + "," + "joined_room" + "," + timestamp + "," + room_id)
                    clearInterval(joinRoomPoll);
                    b.click();
                    let avatarSelectionPoll = setInterval(
                        () => {
                            let buttons = [...document.getElementsByClassName("TextInput__button__1ue_9")];
                            if (!buttons.length) {
                                return;
                            }
                            buttons.forEach((b) => {
                                if (b.innerText == "Accept") {
                                    b.onclick = () => {
                                        const timestamp = Date.now()
                                        console.log("Overseer: avatar selected " + timestamp);
                                        socket.send(overseer_session_id + "," + "avatar_selected" + "," + timestamp + "," + room_id)
                                        clearInterval(avatarSelectionPoll);
                                    }
                                }
                            })
                        },
                        100
                    )
                }
            })
        },
        500
    )
}




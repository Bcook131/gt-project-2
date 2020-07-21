$(document).ready(function() {
    function addFriend() {
      let userId = $("#userid") //userlogged in;
      let friendId=$("#user_id") //person user they click to add
        db.User_Friends.create({
        attributes: {
          include: [
            [
              sequelize.literal(`(
                        insert into User_Friends (userUserId, friendUserId) values (${userId}, ${friendId})
                    )`),
            ],
          ],
        },
      });
    }
    })
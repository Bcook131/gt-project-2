$(document).ready(function() {
function findFriends() {
  let userid;
  let occupationid = $("#occupationid");
  let gameid = $("#gameid");
    User.findAll({
    attributes: {
      include: [
        [
          sequelize.literal(`(
                    SELECT u.firstName, u.lastName, o.occupation, g.name 
                    FROM users_games ug
                    join users u
                    on ug.user_id = u.user_id
                    join games g
                    on g.game_id = ug.game_id
                    join occupations o
                    on u.occupationid = o.id
                    where u.user_id not in(select user_id from users where u.user_id = ${userid})
                    and occupationid = ${occupationid}
                    and ug.game_id = ${gameid} ;
                )`),
          "laughReactionsCount",
        ],
      ],
    },
  });
}
})
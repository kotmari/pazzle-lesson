$(document).ready(function () {
  let timer;
  let second = 0;
  let result;

  let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  $(".newGame").click(function () {
    $(".end-game").html("");
    for (let j = 0; j < 16; j++) {
      $(".end-game").append('<div class="boxWin"></div>');
    }

    array.sort(function () {
      return 0.5 - Math.random();
    });

    $(".start-game").html("");
    for (let i = 0; i < array.length; i++) {
      $(".start-game").append(
        '<div id="' + array[i] + '" class="box box' + array[i] + '"></div>'
      );
    }

    /*---------------block buttom result--------------*/
    $(".result")
      .prop("disabled", true)
      .css("background-color", "rgba(148, 177, 240, 0.9)");
    $(".start")
      .prop("disabled", false)
      .css("background-color", "rgb(34, 93, 219)");
    clearInterval(timer);
    $(".timer__oclock").text("01 : 00");
  });

  $(".start").click(function () {
    second = 60;

    $(".start")
      .prop("disabled", true)
      .css("background-color", "rgba(148, 177, 240, 0.9)");
    $(".result")
      .prop("disabled", false)
      .css("background-color", "rgb(34, 93, 219)");

    $(".box").draggable({
      revert: "invalid",
      start: function () {
        if ($(this).hasClass("dropPiece")) {
          $(this).removeClass("dropPiece");
          $(this).parent().removeClass("piece");
        }
      },
    });
    $(".boxWin").droppable({
      accert: function () {
        return !$(this).hasClass("piece");
      },
      drop: function (event, ui) {
        let elemDrag = ui.draggable;
        let dropOn = $(this);
        dropOn.addClass("piece");
        $(elemDrag)
          .addClass("dropPiece")
          .css({
            top: 0,
            left: 0,
            position: "relative",
          })
          .appendTo(dropOn);
      },
    });

    timer = setInterval(function () {
      second--;
      if (second < 10) {
        $(".timer__oclock").text("00 : 0" + second);
      } else {
        $(".timer__oclock").text("00 : " + second);
      }
      if (second == 0) {
        $(".modalWindow").fadeIn(400);
        $(".green").fadeOut(300);
        $(".message").text("It's a pity, but you lost");
        clearInterval(timer);
        $(".timer__oclock").text("01 : 00");
      }
    }, 1000);
  });

  /*----------------------------buttom result-----------------*/
  $(".result").click(() => {
    $(".modalWindow").fadeIn(400);
    $(".green").fadeIn(300);
    $(".message").text("You still have time, you sure?");
    $(".message").append(
      `<div class="timer__oclock mess-timer">00 : ${second}</div>`
    );
    $(".green")
      .prop("disabled", false)
      .css("background-color", "rgb(31, 143, 31)");
  });

  $(".green").click(() => {
    if (second != 0) {
      $(".modalWindow").fadeIn(400);
      $(".message").text("It's a pity, but you lost");
      $(".timer__oclock").text("01 : 00");
      $(".green")
        .prop("disabled", true)
        .css("background-color", "rgb(31, 143, 31)");
      clearInterval(timer);
    }
    if (pazzleChek()) {
      $(".modalWindow").fadeIn(400);
      $(".message").text("Woohoo, well done, you did it!");
      $(".green").fadeOut(100);
    } else {
      $(".modalWindow").fadeIn(400);
      $(".green").fadeOut(100);
      clearInterval(timer);
      $(".message").text("You still have time, you sure?");
    }

  });
  /*-----------------------end--------------------*/

  /*----------------close modal block---------------*/

  $(".red").click(() => {
    $(".modalWindow").fadeOut(400);
  });
  /*-----------------------end--------------------*/
});

function pazzleChek() {
  result = 0;
  for (let k = 0; k < 16; k++) {
    if ($(`.end-game>.boxWin:eq(${k})>.box`).attr("id") == k + 1) {
      result++;
    }
  }
  return result;
}


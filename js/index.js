$(function() {
    load();
    // 按下回车键时把数据存储到本地存储里
    $("#title").on("keydown", function(event) {
            if (event.keyCode === 13) {
                if ($(this).val() === "") {
                    alert("请输入您要的操作");
                } else {
                    var local = getDate();
                    local.push({
                        title: $(this).val(),
                        done: false,
                    });
                    saveDate(local);
                    load();
                    $(this).val("");
                }
            }
        })
        //删除操作
    $("ol,ul").on("click", "a", function() {
            var data = getDate();
            var index = $(this).attr("id");
            data.splice(index, 1);
            saveDate(data);
            load();
        })
        // 正在进行和已完成的选项操作
    $("ol,ul").on("click", "input", function() {
            var data = getDate();
            var index = $(this).siblings("a").attr("id");
            data[index].done = $(this).prop("checked");
            saveDate(data);
            load();
        })
        // 读取本地存储的数据
    function getDate() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }
    // 保存本地存储数据
    function saveDate(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    }
    // 渲染加载页面
    function load() {
        var data = getDate();
        // 遍历前先清空ol里的元素
        $("ol,ul").empty();
        var todoCount = 0; //正在进行的个数
        var doneCount = 0; //已经完成的个数
        $.each(data, function(i, n) {
            if (n.done) {
                $("ul").prepend("<li><input type='checkbox' checked='checked'><p>" + n.title + "</p><a href='javascript:;' id=" + i + "></a></li>");
                doneCount++;
            } else {
                $("ol").prepend("<li><input type='checkbox'><p>" + n.title + "</p><a href='javascript:;' id=" + i + "></a></li>");
                todoCount++;
            }
        });
        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);
    }
})
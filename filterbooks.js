// ==UserScript==
// @name         filterbooks
// @namespace    http://tampermonkey.net/
// @version      2025-09-01
// @description  try to take over the world!
// @author       You
// @match        https://cn.ttkan.co/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ttkan.co
// @grant        none
// ==/UserScript==

let books =
    ['赛博朋克里的锻体独狼', 'CS：我靠肝熟练度成为Top1', '你把人家皇帝防到战俘营了？', 'NBA之绝对统治力', '谁让他打网球的！', '不是造拖拉机吗，怎么改重坦了？', '我的饭馆通北宋', '路明非，不卷你屠什么龙！', '我一个兽医啊！你解锁大医系统！', '地表最强鬼背，叫我去打NBA？', '这个鸣人是玩家', '足球：神级中场，C罗梅西破防了', '华娱1995', '明末：我崇祯摆烂怎么了？！', '这个明星正得发邪', '美警生存实录：以德服人', '我不是戏疯子，我是真能穿剧本', '围棋：谈恋爱哪有头衔战重要', '说好的民企，空天母舰什么鬼', '冠军请留步', '最佳导演的诞生', '从霍格沃茨之遗归来的哈利', '都退役当主播了，系统让我打职业', '人在柯南，我真不是悍匪', 'F1：绝对车感', '塌房？我拆了你这破娱乐圈', '东京病恋女友', '是谁让他当门将的！', 'LPL史记', '当过明星吗，你就写文娱？', '日娱：1986', '网球：他实在太听劝了！', '日娱从声优开始', '停球？那是不可能的！', '从现代归来的朱元璋', '你才玩半年，都代练到总决赛了？', 'CS：拿下Major才来系统？', '人在无限，开始速通', '天榜', '我的手提式大明朝廷', 'LOL：当你将一切做到极致', '我一个三金导演十项全能很合理吧', '科技入侵现代', '龙族：我，情报路明非，概念神！', 'NBA：杨姓中锋，却来后卫模板', '贷款总冠军：从拿了阿摊剧本开始', '中东暴君', '没钱赛什么车？', '说好3A大作，昆特牌什么鬼', '冠军法则', '篮球：从克莱汤普森开始！', '武侠世界，红尘剑仙', 'LOL：十连冠后，开局刷满属性', '我在三国骑砍无双', '修仙：我在现代留过学', '华娱的盛宴', '从防守外星人开始', '诸界龙劫', '文豪1879：独行法兰西', '跟偶像沾边的事你是一点不干啊！', '篮坛神迹', '同时穿越：从回归主神空间开始', '重生97，我在市局破悬案', '足球：射术不行？我选择过掉全场', '游戏制作：从重铸二次元游戏开始', 'LOL：才满18，让我逆袭重生', 'CS：从觉醒死神之眼开始', '涅槃上单，转生东京少女', '重生游戏黄金时代：我成世嘉太子', '我在现代留过学', '我真的控制不住自己', '柯南：米花町爆改洛圣都', 'CS：才16岁，让我老登逆袭？', '传送门通历史，我上报国家', '龙族：穿越无限世界的路明非', '我写的自传不可能是悲剧', '我只会蹭热度啊！', '超能力者在霍格沃茨', '国民法医', '无限恐怖之重铸魔网荣光', '无限恐怖之这个中洲很叛逆', 'NBA：融合鬼背成篮球之神', '开局重置能力，单边超巨强袭！', '冠军都拿腻了，居然还要青训？', '我在骑砍当神明', 'NBA：为大姚刷出个总冠军', '成影帝了，系统才加载完', '都重生了谁还打网球啊', '娱乐：有外挂了谁还谈恋爱啊', '都二十一世纪了，才捡到传国玉玺', '华娱：从预支演技开始', '足球：我的AI系统提供满级预判', '通关黑篮后，我重返NBA选秀夜', '入侵美利坚', '战国生存指南', 'LOL：才16，躺平系统什么鬼', '我的大富翁游戏成真了？！', '被辞退后，我成为医药之光']

let books1 =
    ['东京少女的二次元帝国', '人在灌篮，打铁就能变强', '从婴儿开始的人生赢家', 'NBA：才19岁，让我老登逆袭', '塌房的我拿诺奖更火了', '东京职业体验人生', '儒道成圣，但是理科生', '转生百世，我成了仙道至尊', 'CSGO：我能抽取超能力', '自带AI，我教棋圣下围棋', '破案：我的超能力每周刷新']

books.push(...books1);
console.log(books);
function work() {
    'use strict';


    // <div role="list" style=""><div class="pure-g update_chapter_list" role="listitem">
    //     <div class="pure-u-xl-1-12 pure-u-lg-1-12 pure-u-md-1-12 pure-u-sm-1-12 pure-hidden-xs novel_type">
    //         [<span>科幻</span>]
    //     </div>
    //     <div class="pure-u-xl-1-4 pure-u-lg-1-4 pure-u-md-1-3 pure-u-sm-1-3 pure-u-5-12 novel_name">
    //         <a target="_top" aria-label="剑仙老祖靠直播毛茸茸爆红星际" href="https://cn.ttkan.co/novel/chapters/jianxianlaozukaozhibomaorongrongbaohongxingji-xiangchengweibazhuaguai">《剑仙老祖靠直播毛茸茸爆红星际》</a>
    //     </div>
    //     <div class="pure-u-xl-5-12 pure-u-lg-5-12 pure-u-md-1-2 pure-u-sm-1-2 pure-u-7-12 chapter_name">
    //         <a target="_top" aria-label="第七十八章 冰原巨狼" href="https://cn.ttkan.co/novel/user/page_direct?novel_id=jianxianlaozukaozhibomaorongrongbaohongxingji-xiangchengweibazhuaguai&amp;page=78">第七十八章 冰原巨狼</a>
    //     </div>
    //     <div class="pure-u-xl-1-6 pure-u-lg-1-6 pure-hidden-md pure-hidden-sm pure-hidden-xs author">
    //         想成为八爪怪
    //     </div>
    //     <div class="pure-u-xl-1-12 pure-u-lg-1-12 pure-u-md-1-12 pure-u-sm-1-12 pure-hidden-xs update_time">
    //         09-01
    //     </div>
    let container = document.querySelector('div[role="list"]');
    // if (!container)  {
    //     container = document.querySelector('div.update_chapter_list');
    // }
    if (!container) return false;

    console.log('!!!!')

    const divs = Array.from(container.children).filter(el => el.tagName.toLowerCase() === 'div');
    console.log(divs.length)
    for (let i = 0; i < divs.length; i += 1) {
        let now = divs[i]
        if (now && (now.hidden || now.getAttribute('aria-hidden') === 'true' || now.style.display === 'none'  )) {
            continue;
        }
        const line = now.children;
        const second = line[1];
        
        const a = second.querySelector('a');
        let title = a ? a.textContent.trim() : '';
        // console.log(title)
        
        if (!title || title[0] !== '《') {
            throw new Error('书名格式不正确');
        }
        title = title.slice(1, -1);

        const matched = books.some(b => b && title === b);
        if (!matched) {
            now.style.display = 'none';
            now.setAttribute('aria-hidden', 'true');
        }
    }
}




const intervalId = setInterval(() => {
    try {
        if (work()) {
            clearInterval(intervalId);
            console.log("work() succeeded, stopping interval");
        }
    } catch (error) {
        console.error("Error in work function:", error);

    }
}, 1000); // Check every 1 second
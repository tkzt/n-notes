---
title: Vue 实现 2048
titleTemplate: Boring Plans
---
# Vue 实现 2048

## 前言

最近在入门 VueJS, 就顺便把上次从家坐大巴去无锡时，为了转移注意力克服晕车想的 2048 思路给实现了。但 2048 一下子就想完了，车程却有 4 个多小时，后来我就开始想毕业，想错过的班级合照，想 406 的倒霉蛋们……扯远了，但前言不就是这些有的没的。

## 如下

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>2048</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vuetify@2.6.3/dist/vuetify.min.css">
    <style>
        .cell {
            background: #C7EDCC;
            cursor: default;
            height: 75px;
            width: 75px;
            border: thin solid #f2f3f8;
            font-size: 14px;
            font-weight: bold;
            user-select: none;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .title{
            text-align: center;
            margin: 0.37em 0;
            user-select: none;
        }
        .app{
            width: 100vw;
            height: 100vh;
            background-color: #f2f3f8;
            position: fixed;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        html{
            margin: 0;
            overflow: auto;
        }
    </style>
<body>
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.8/dist/vue.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vuetify@2.6.3/dist/vuetify.min.js"></script>
<div
    id="app"
    class="app"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
>
    <v-card style="width: 300px;" outlined>
        <h3 v-if="gameOver" class="title">
            😥 Game over! click <a @click="init">here</a> to restart
        </h3>
        <h3 v-else class="title"><span v-if="max>=2048">🎉🎉</span>Max: {{ max }}</h3>
        <v-row v-for="(d, index) in data" :key="index" style="width: 300px" no-gutters>
            <v-col
                    cols="3"
                    v-for="(i, idx) in d"
                    :key="idx"
                    class="cell"
                    :style="{
                            color: colors[i] || colors['greater'],
                            'border-top': index===0? 'none' : 'auto',
                            'border-left': idx===0? 'none' : 'auto',
                            'border-bottom': 'none',
                            'border-right': 'none',
                        }
                    ">
                {{ i }}
            </v-col>
        </v-row>
    </v-card>
</div>
<script>
    new Vue({
        el: '#app',
        data: () => ({
            data: [],
            gameOver: false,
            colors: {
                0: '#fafafa',
                2: '#00BCD4',
                4: '#0097A7',
                8: '#03A9F4',
                16: '#1976D2',
                32: '#3F51B5',
                64: '#009688',
                128: '#673AB7',
                256: '#9C27B0',
                512: '#E57373',
                1024: '#F06292',
                2048: '#C2185B',
                greater: '#880E4F',
            },
            startPos: [],
        }),
        created() {
            this.init();
        },
        mounted(){
            window.addEventListener('keydown', this.onKeyDown);
        },
        beforeDestroy(){
            window.removeEventListener('keydown', this.onKeydown);
        },
        computed: {
            max() {
                let max = 0;
                this.data.forEach(d => {
                    const rowMax = Math.max(...d);
                    (max < rowMax) && (max = rowMax);
                })
                return max;
            }
        },
        methods: {
            init() {
                this.data = [];
                this.gameOver = false;
                for (let row = 0; row < 4; row++) {
                    const rowArr = [];
                    for (let col = 0; col < 4; col++) {
                        rowArr.push(0);
                    }
                    this.data.push(rowArr);
                }
                this.add();
            },
            add() {
                const [row, col] = [
                    Math.floor(Math.random() * 4),
                    Math.floor(Math.random() * 4),
                ];
                if (this.data[row][col]) {
                    this.add();
                } else {
                    this.data[row][col] = Math.random() > 0.5 ? 2 : 4;
                }
            },
            move(rowArr) {
                const validArr = rowArr.filter((a) => a !== 0);
                rowArr.forEach((_, i) => rowArr[i] = validArr[i] || 0);
            },
            merge(rowArr) {
                rowArr.forEach((r, i) => {
                    if (i + 1 < rowArr.length && r === rowArr[i + 1] && r !== 0) {
                        rowArr[i] *= 2;
                        rowArr[i + 1] = 0;
                        this.merge([...rowArr]);
                    }
                });
            },
            act(rowArr) {
                const originalArr = JSON.stringify(rowArr);
                this.move(rowArr);
                this.merge(rowArr);
                if (JSON.stringify(rowArr) !== originalArr) {
                    this.move(rowArr);
                }
            },
            react(direction) {
                !this.update(direction) && this.add();
                this.checkOver();
            },
            update(direction, reserve=false) {
                let rowArr;
                const originalData = JSON.parse(JSON.stringify(this.data));
                for (let row = 0; row < 4; row++) {
                    switch (direction) {
                        case "left":
                            this.act(originalData[row]);
                            break;
                        case "right":
                            this.act(originalData[row].reverse());
                            originalData[row].reverse();
                            break;
                        case "up":
                            rowArr = [];
                            for (let i = 0; i < 4; i++) {
                                rowArr.push(originalData[i][row]);
                            }
                            this.act(rowArr);
                            for (let i = 0; i < 4; i++) {
                                originalData[i][row] = rowArr[i];
                            }
                            break;
                        case "down":
                            rowArr = [];
                            for (let i = 4 - 1; i >= 0; i--) {
                                rowArr.push(originalData[i][row]);
                            }
                            this.act(rowArr);
                            for (let i = 0; i < 4; i++) {
                                originalData[i][row] = rowArr[4 - i - 1];
                            }
                            break;
                        default:
                            break;
                    }
                }

                const same = JSON.stringify(this.data) === JSON.stringify(originalData);
                !reserve && (this.data = JSON.parse(JSON.stringify(originalData)))

                return same;
            },
            checkOver() {
                this.gameOver = this.update('up', true) && this.update('down', true) && this.update('left', true) && this.update('right', true);
            },
            toReact(stopX, stopY){
                const horizontalDelta = stopX - this.startPos[0];
                const verticalDelta = stopY - this.startPos[1];

                const horizontalDeltaAbs = Math.abs(horizontalDelta);
                const verticalDeltaAbs = Math.abs(verticalDelta)

                if(horizontalDeltaAbs>3 || verticalDeltaAbs>3){
                    if(Math.abs(horizontalDelta)>Math.abs(verticalDelta)){
                        if(horizontalDelta>0){
                            this.react('right');
                        }else{
                            this.react('left');
                        }
                    }else{
                        if(verticalDelta>0){
                            this.react('down');
                        }else{
                            this.react('up')
                        }
                    }
                }
            },
            onTouchStart(ev){
                this.startPos = [ev.touches[0].clientX, ev.touches[0].clientY];
            },
            onTouchEnd(ev){
                this.toReact(ev.changedTouches[0].clientX, ev.changedTouches[0].clientY);
            },
            onTouchMove(ev){
                ev.preventDefault();
            },
            onKeyDown(ev){
                this.react(ev.key.replace('Arrow', '').toLowerCase());
            }
        }
    })
</script>
</body>
</html>
```

## Try

<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=100% height=400 src="/2048.html"></iframe>

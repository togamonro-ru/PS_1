
// MyScene1クラス
// 他のJSファイルから呼び出された場合はシーンを返す
class MyScene extends Phaser.Scene {

    // 継承した「Phaser.Scene」クラスのコンストラクタの呼び出し
    constructor() {
        super({ key: 'MyScene', active: true });
    }

    // シーンの事前読み込み処理
    preload() {
         // 画像の読み込み(使用する時の名前, パス)
        this.load.image('background', 'assets/background.png');
        this.load.image('taro', 'assets/taro.png');
        this.load.image('jori', 'assets/jiro.png');
    }

    // シーン初期化処理
    create() {
         // 単体画像をシーンに追加(X座標,Y座標,画像名)
         this.add.image(D_WIDTH/2, D_HEIGHT/2, 'background');
         this.player1 = this.add.image(500, 350, 'taro');
         this.player1_direction = 1;
         this.player2 = this.add.image(600, 350, 'jori');
         this.player2_direction = 1;


         this.text = this.add.text(10, 10, 'Scene 1').setFontSize(32).setColor('#ff0');
        this.Text = this.add.text(600, 400, 'MyWorld', { fontSize: '28px', fill: '#FFF' ,fontFamily: "Arial"});
        this.a_Text = this.add.text(100, 50, '', { fontSize: '28px', fill: '#FFF' ,fontFamily: "Arial"});
        this.s_Text = this.add.text(100, 50, '', { fontSize: '28px', fill: '#FFF' ,fontFamily: "Arial"});

        ///WASDキーを検知できるようにする
        this.keys = {};
        this.keys.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keys.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keys.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keys.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }
    
  // 毎フレーム実行される繰り返し処理
    update() {
        // if (this.player1.x >= D_WIDTH - 50) this.player1_direction = -1;
        // if (this.player1.x <= 50) this.player1_direction = 1;

        // if (this.player1_direction == 1) {
        //     this.player1.x += 5;// 横方向へ移動を設定
        //     this.player1.y += 5;
        //     this.player1.angle += 5;
        // } else {
        //     this.player1.x -= 5;// 横方向へ移動を設定
        //     this.player1.y -= 5;
        //     this.player1.angle += 5;
        // }
        // キーボードの情報を取得

        let cursors = this.input.keyboard.createCursorKeys();
        if (cursors.up.isDown) {
        this.player1.y -= 3;// 上方向に移動
        } else if (cursors.down.isDown) {
        this.player1.y += 3;// 下方向に移動
        } else if (cursors.left.isDown) {
        //console.log("Left!");
        this.player1.x -= 50;// 右方向に移動
        this.player2.x += 50;// 左方向に移動
        } else if (cursors.right.isDown) {
        //console.log("Right!");
        this.player1.x += 50;// 右方向に移動
        this.player2.x -= 50;// 右方向に移動
        }
        this.wasd_move(this.keys, this.a_Text);
        this.wasd_move(this.keys, this.s_Text);
    }
    
    wasd_move(keys, object){
        if(keys.keyS.isDown){
            this.s_Text.setText('Hey!');
        }else if(keys.keyA.isDown){
            this.a_Text.setText('Hello!');
        }else if(keys.keyD.isDown){
            this.a_Text.setText('');
            this.s_Text.setText('');
        }
    }
}

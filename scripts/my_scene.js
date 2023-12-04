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
        this.load.image('sky', 'assets/background.png');
        this.load.image('taro', 'assets/taro.png');
        this.load.image('jiro', 'assets/taro.png');
        this.load.image('hanako', 'assets/hanako.png');
    }

    // シーン初期化処理
    create() {
         // 単体画像をシーンに追加(X座標,Y座標,画像名)
        this.add.image(400, 225, 'sky');

        const player = this.physics.add.sprite(500, 350, 'taro');
        this.player = player
        this.player.angle = 0;
        // const player2 = this.physics.add.sprite(400, 350, 'jiro');
        // this.player2 = player2
        this.hanako = this.physics.add.group();

        this.Text = this.add.text(600, 400, 'MyWorld', { fontSize: '28px', fill: '#FFF' ,fontFamily: "Arial"});
        this.a_Text = this.add.text(100, 50, '', { fontSize: '28px', fill: '#FFF' ,fontFamily: "Arial"});
        this.s_Text = this.add.text(100, 50, '', { fontSize: '28px', fill: '#FFF' ,fontFamily: "Arial"});
        // let  randx = Phaser.Math.Between(50, 750) ; 
        // let randy =  Phaser.Math.Between(50, 200) ; 
        this.physics.world.setBounds(0, 0, 800, 600);

        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        this.input.keyboard.createCursorKeys();

        this.physics.world.on('worldbounds', function (body) {
            if (body.gameObject === player) {
                player.setVelocityX(0);
                player.setVelocityY(0);
            }
        });
        this.physics.add.collider(player, this.hanako, this.attack_hanako, null, this);
        this.physics.add.collider(this.hanako, this.hanako, this.attack_hanako, null, this);

        this.time.addEvent({
            delay: 3000,
            callback: this.generateHanako,
            callbackScope: this,
            loop: false 
        });
    


        ///WASDキーを検知できるようにする
        this.keys = {};
        this.keys.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keys.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keys.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keys.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);


        this._timeCounter = 0; 
        this.time = 0;
    }
    
  // 毎フレーム実行される繰り返し処理
  update(time, delta) {
    let cursors = this.input.keyboard.createCursorKeys();

    if (cursors.up.isDown) {
        this.player.setVelocityY(-200);
    } else if (cursors.down.isDown) {
        this.player.setVelocityY(200);
    } else {
        this.player.setVelocityY(0);
    }

    if (cursors.left.isDown) {
        this.player.setVelocityX(-200);
    } else if (cursors.right.isDown) {
        this.player.setVelocityX(200);
    } else {
        this.player.setVelocityX(0);
    }
    this.wasd_move(this.keys, this.a_Text);
    this.wasd_move(this.keys, this.s_Text);
    this.wasd_move(this.keys, this.w_hanako);

    this._timeCounter += delta;
    if (this._timeCounter >= 3000) {
        this._timeCounter = 0;
        this.time++;

        if (this.time === 3) {
          
            hanako.children.iterate(function (hanako) {
                let randX = Phaser.Math.Between(200, 400);
                let randY = Phaser.Math.Between(100, 200);
                hanako.setPosition(randX, randY);
            });
        }
    }
}

        //  if (this.player.x >= D_WIDTH - 100) this.player_direction = -1;
        //  if (this.player.x <= 450) this.player_direction = 1;
        //  if (this.player_direction == 1) {
        //      this.player.setVelocityX(100);
        //      this.player.setVelocityY(-100);
        //  } else {
        //     this.player.setVelocityX(-100);
        //     this.player.setVelocityY(100);
        //  }


        // if (this.player.y >= D_WIDTH - 400) this.player_direction3 = -1;
        // if (this.player.y <= 30) this.player_direction3 = 1;
        // if (this.player.x >= D_WIDTH - 100) this.player_direction3 = -1;
        // if (this.player.x <= 0) this.player_direction3 = 1;

        //     this.player.y -= 5;
        //     this.player.x += 5;

        // this.player.angle += 5;
        // this.player.setAngle( this.player.angle );
        // if (this.player.x >= D_WIDTH - 100) this.player_direction = 1;
        //  if (this.player_direction == 1) {
        //     reset
        //  }


    wasd_move(keys, object){
        if(keys.keyS.isDown){
            this.s_Text.setText('Hey!');
        }else if(keys.keyA.isDown){
            this.a_Text.setText('Hello!');
        }else if(keys.keyD.isDown){
            this.a_Text.setText('');
            this.s_Text.setText('');
        // }else if(keys.keyW.isDown){
        //     let randX = Phaser.Math.Between(100, 400);
        //     this.w_hanako.setPosition(randX, 100);
        // }
        }
    }
    attack_hanako(player, hanako) {
        this.Text.setText('痛い');
        hanako.destroy();
        this.player.setTint(0x999999);
    }

    generateHanako() {

        let randX = Phaser.Math.Between(200, 400);
        let randY = Phaser.Math.Between(100, 200);
        this.hanako.create(randX, randY, 'hanako');
    }

}
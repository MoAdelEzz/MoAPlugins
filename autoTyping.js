function AutoType(toApplyAutoTyping = $('.MA_AutoTyping'), wordsToType = Array(),option)
{
    this.CharacterCnt = 0;
    this.options = 
    {
        timeBeforeRemove: 1000,
        timeBetweenWords: 1000,
        speed: 200,
    }

    this.beforeDelete = this.options.timeBeforeRemove;
    this.beforeNext = this.options.timeBetweenWords;

    if (option)
    {
        this.options.speed = option.speed ? option.speed : 200;
        this.options.timeBeforeRemove = option.timeBeforeRemove ? option.timeBeforeRemove : 1000;
        this.options.timeBetweenWords = option.timeBetweenWords ? option.timeBetweenWords : 1000;
    }


    function WordCnt()
    {
        this.value = 0;                       // Initial Value
        this.invokeFunctions = Array();      // Functions To Invoke
    
        this.Invoke = function(f, Delay = 0)
        {
            this.invokeFunctions.push(
                {
                    functionality: f,
                    delay : Delay,
                }
            );
        }
    
        this.Increament = function()
        {
            this.value = (this.value + 1) % wordsToType.length;

            for (let i = 0 ; i < this.invokeFunctions.length; i++)
            {
                setTimeout(this.invokeFunctions[i].functionality, this.invokeFunctions[i].delay);
            }
        }
    }
    

    this.WordCntr = new WordCnt();
    this.WordCntr.Invoke(TypeWord,this.beforeNext);


    function TypeWord()
    {
        if (CharacterCnt == wordsToType[WordCntr.value].length)
        {
            setTimeout(RemoveWord,beforeDelete);
            return;
        }
       toApplyAutoTyping.append(wordsToType[WordCntr.value][CharacterCnt++]);
       setTimeout(TypeWord,this.options.speed);
    }

    function RemoveWord()
    {   
        if (CharacterCnt == 0)
        {
            WordCntr.Increament();
            return;
        }
        toApplyAutoTyping.text(toApplyAutoTyping.text().substring(0,--CharacterCnt));
        setTimeout(RemoveWord,this.options.speed);

    }

    setTimeout(TypeWord,this.beforeNext);

}


AutoType($('Your Container'), ["Example-1", "Example-2", "Example-3"],{speed: 10});










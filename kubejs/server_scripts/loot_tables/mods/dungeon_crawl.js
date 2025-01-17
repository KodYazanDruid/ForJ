const CAPACITOR = 'thermaloot:single_capacitor'

const DCC = (type) => `dungeoncrawl:chests/${type}`

let brick_map = new Map([
    ['create:cut_andesite_bricks', 2],
    ['create:cut_diorite_bricks', 2],
    ['create:cut_granite_bricks', 2],
    ['create:cut_calcite_bricks', 2],
    ['create:cut_tuff_bricks', 2],
    ['create_dd:cut_gabbro_bricks', 2],
    ['create:cut_deepslate_bricks', 2],
    ['create:cut_dripstone_bricks', 2],
    ['create:cut_limestone_bricks', 2],
    ['create_dd:cut_weathered_limestone_bricks', 2]
])

onEvent('lootjs', event => {
    event.addLootTableModifier(/dungeoncrawl:chests\/\w+/)
        .pool(pool => {
            pool.randomChance(.4)
            pool.addLoot(LootEntry.of('create:shaft')).limitCount([4, 7]).randomChance(.6)
            pool.addLoot(LootEntry.of('create:cogwheel')).limitCount([4, 6]).randomChance(.6)
            pool.addLoot(LootEntry.of('create:large_cogwheel')).limitCount([2, 4]).randomChance(.5)
            pool.addLoot(LootEntry.of('create:gearbox')).limitCount([1, 3]).randomChance(.4)
            pool.addLoot(LootEntry.of('create:copper_casing')).limitCount([2, 4]).randomChance(.5)
            pool.addLoot(LootEntry.of('create:andesite_casing')).limitCount([2, 4]).randomChance(.5)
            pool.addLoot(LootEntry.of('create:brass_casing')).limitCount([2, 3]).randomChance(.4)
            pool.addLoot(LootEntry.of('create_dd:inductive_mechanism')).limitCount([1, 2]).randomChance(.3)
            pool.addLoot(LootEntry.of('create:polished_rose_quartz')).limitCount([4, 5]).randomChance(.4)
        })
        .pool(pool => {
            pool.randomChance(.5)
            pool.addLoot(LootEntry.of('thermal:syrup_bottle')).limitCount([2, 4]).randomChance(.6)
            pool.addLoot(LootEntry.of('thermal:rich_slag')).limitCount([1, 2]).randomChance(.3)
            pool.addLoot(LootEntry.of('thermal:slag')).limitCount([3, 5]).randomChance(.5)
            pool.addLoot(LootEntry.of('thermal:cured_rubber')).limitCount([1, 3]).randomChance(.4)
            pool.addLoot(LootEntry.of('thermal:rosin')).limitCount([2, 4]).randomChance(.6)
            pool.addLoot(LootEntry.of('thermal:tar')).limitCount([2, 4]).randomChance(.6)
            pool.addLoot(LootEntry.of('thermal:bitumen')).limitCount([2, 3]).randomChance(.4)
        })
        .pool(pool => {
            pool.randomChance(.3)
            pool.addLoot(LootEntry.of('industrialforegoing:plastic')).limitCount([1, 3]).randomChance(.3)
            pool.addLoot(LootEntry.of('industrialforegoing:dryrubber')).limitCount([2, 4]).randomChance(.4)
            pool.addLoot(LootEntry.of('industrialforegoing:tinydryrubber')).limitCount([3, 7]).randomChance(.6)
        })
        .apply(ctx => {
            ctxWeighedReplace(ctx, 'rotten_flesh', [
                ['rotten_flesh', 4],
                [IEt`cured_jerky`, 2],
                ['brewinandchewin:jerky', 2]
            ])
            let keys_3 = selectRandomElements(Array.from(brick_map.keys()), 3)
            let selected_bricks = new Map()
            keys_3.forEach(k => selected_bricks.set(k, 2))
            ctxWeighedReplace(ctx, 'stone_bricks', selected_bricks)
            ctxReplacePreserveNbt(ctx, '#twilight:head_wearable', global.basic_helmet_loot)
            ctxReplacePreserveNbt(ctx, '#twilight:chest_wearable', global.basic_chestplate_loot)
            ctxReplacePreserveNbt(ctx, '#twilight:legs_wearable', global.basic_leggings_loot)
            ctxReplacePreserveNbt(ctx, '#twilight:feet_wearable', global.basic_boots_loot)
            ctxReplacePreserveNbt(ctx, '#forge:tools/swords', global.basic_sword_loot)
            ctxReplacePreserveNbt(ctx, '#forge:tools/shovels', global.basic_shovel_loot)
            ctxReplacePreserveNbt(ctx, '#forge:tools/pickaxes', global.basic_pickaxe_loot)
            ctxReplacePreserveNbt(ctx, '#forge:tools/axes', global.basic_axe_loot)
            ctxReplacePreserveNbt(ctx, '#forge:tools/hoes', global.basic_hoe_loot)
        })

    event.addLootTableModifier(DCC`library`)
        .apply(ctx => { if (Math.random() < .2) ctx.addLoot(genTome()) })

    event.addLootTableModifier(DCC`forge`)
        .apply(ctx => {
            ctxWeighedReplace(ctx, 'coal', [
                ['coal', 9],
                ['thermal:coal_coke', 1]
            ])
        })

    event.addLootTableModifier(DCC`treasure`)
        .apply(ctx => {
            ctxReplacePreserveNbt(ctx, '#forge:tools/swords', [CSt`brass_sword`, 'diamond_sword', CSt`rose_quartz_sword`])
            ctxReplacePreserveNbt(ctx, '#forge:tools/pickaxes', [CSt`brass_pickaxe`, 'diamond_pickaxe', CSt`rose_quartz_pickaxe`])
            ctxReplacePreserveNbt(ctx, '#forge:tools/axes', [CSt`brass_axe`, 'diamond_axe', CSt`rose_quartz_axe`])
            ctxReplacePreserveNbt(ctx, '#forge:tools/shovels', [CSt`brass_shovel`, 'diamond_shovel', CSt`rose_quartz_shovel`])
            ctxReplacePreserveNbt(ctx, '#forge:tools/hoes', [CSt`brass_hoe`, 'diamond_hoe'])
            ctxReplacePreserveNbt(ctx, '#twilight:head_wearable', [CSt`brass_helmet`, 'diamond_helmet'])
            ctxReplacePreserveNbt(ctx, '#twilight:chest_wearable', [CSt`brass_chestplate`, 'diamond_chestplate'])
            ctxReplacePreserveNbt(ctx, '#twilight:legs_wearable', [CSt`brass_leggings`, 'diamond_leggings'])
            ctxReplacePreserveNbt(ctx, '#twilight:feet_wearable', [CSt`brass_boots`, 'diamond_boots'])
        })

    event.addLootTableModifier(DCC`stage_4`)
        .apply(ctx => {
            ctxReplacePreserveNbt(ctx, '#forge:tools/swords', [CSt`brass_sword`, 'diamond_sword', CSt`rose_quartz_sword`])
            ctxReplacePreserveNbt(ctx, '#forge:tools/pickaxes', [CSt`brass_pickaxe`, 'diamond_pickaxe', CSt`rose_quartz_pickaxe`])
            ctxReplacePreserveNbt(ctx, '#forge:tools/axes', [CSt`brass_axe`, 'diamond_axe', CSt`rose_quartz_axe`])
            ctxReplacePreserveNbt(ctx, '#forge:tools/shovels', [CSt`brass_shovel`, 'diamond_shovel', CSt`rose_quartz_shovel`])
            ctxReplacePreserveNbt(ctx, '#forge:tools/hoes', [CSt`brass_hoe`, 'diamond_hoe', CSt`rose_quartz_hoe`])
            ctxReplacePreserveNbt(ctx, '#twilight:head_wearable', [CSt`brass_helmet`, 'diamond_helmet', 'iron_helmet', TCOMPt`bronze_helmet`])
            ctxReplacePreserveNbt(ctx, '#twilight:chest_wearable', [CSt`brass_chestplate`, 'diamond_chestplate', 'iron_chestplate', TCOMPt`bronze_chestplate`])
            ctxReplacePreserveNbt(ctx, '#twilight:legs_wearable', [CSt`brass_leggings`, 'diamond_leggings', 'iron_leggings', TCOMPt`bronze_leggings`])
            ctxReplacePreserveNbt(ctx, '#twilight:feet_wearable', [CSt`brass_boots`, 'diamond_boots', 'iron_boots', TCOMPt`bronze_boots`])
        })
    event.addLootTableModifier(DCC`stage_5`)
        .apply(ctx => {
            ctxReplacePreserveNbt(ctx, '#forge:tools/swords', [CSt`brass_sword`, 'diamond_sword', CSt`rose_quartz_sword`])
            ctxReplacePreserveNbt(ctx, '#forge:tools/pickaxes', [CSt`brass_pickaxe`, 'diamond_pickaxe', CSt`rose_quartz_pickaxe`])
            ctxReplacePreserveNbt(ctx, '#forge:tools/axes', [CSt`brass_axe`, 'diamond_axe', CSt`rose_quartz_axe`])
            ctxReplacePreserveNbt(ctx, '#forge:tools/shovels', [CSt`brass_shovel`, 'diamond_shovel', CSt`rose_quartz_shovel`])
            ctxReplacePreserveNbt(ctx, '#forge:tools/hoes', [CSt`brass_hoe`, 'diamond_hoe', CSt`rose_quartz_hoe`])
            ctxReplacePreserveNbt(ctx, '#twilight:head_wearable', [CSt`brass_helmet`, 'diamond_helmet', 'iron_helmet', TCOMPt`bronze_helmet`])
            ctxReplacePreserveNbt(ctx, '#twilight:chest_wearable', [CSt`brass_chestplate`, 'diamond_chestplate', 'iron_chestplate', TCOMPt`bronze_chestplate`])
            ctxReplacePreserveNbt(ctx, '#twilight:legs_wearable', [CSt`brass_leggings`, 'diamond_leggings', 'iron_leggings', TCOMPt`bronze_leggings`])
            ctxReplacePreserveNbt(ctx, '#twilight:feet_wearable', [CSt`brass_boots`, 'diamond_boots', 'iron_boots', TCOMPt`bronze_boots`])
        })
})

//Use this to add thermaloot capacitor
onEvent('chest.loot_tables', event => {
    event.modify('minecraft:chests/buried_treasure', table => {
        table.addPool(p => {
            p.setUniformRolls(1, 1)
            p.addLootTable(CAPACITOR)
            p.addItem('minecraft:tnt', '1', [2, 4])
        })
    })

    /* event.addChest('dungeoncrawl:food', table =>{
        table.addPool(pool =>{
            pool.setUniformRolls(6, 12)
            pool.addItem(FD+':chicken_sandwich', '1', [1, 2])
            pool.addItem(FD+':stuffed_potato', '1', [1, 2])
            pool.addItem(FD+':bacon_sandwich', '1', [1, 2])
            pool.addItem(FD+':smoked_ham', '1', [1, 2])
            pool.addItem(FD+':mutton_wrap', '1', [1, 2])
            pool.addItem(FD+':glow_berry_custard', '1', [1, 3])
            pool.addItem(FD+':melon_popsicle', '1', [1, 4])
            pool.addItem('create:chocolate_glazed_berries', '1', [1, 2])
            pool.addItem('create:honeyed_apple', '1', [1, 2])
            pool.addItem('thermal:pbj_sandwich', '1', [1, 3])
        })
    })
    event.addChest('dungeoncrawl:forge', table =>{
        table.addPool(pool =>{
            function addArmor(material){
                pool.addItem(`create_sa:${material}_helmet`).randomChance(0.5).enchantWithLevels(5, false)
                pool.addItem(`create_sa:${material}_chestplate`).randomChance(0.5).enchantWithLevels(5, false)
                pool.addItem(`create_sa:${material}_leggings`).randomChance(0.5).enchantWithLevels(5, false)
                pool.addItem(`create_sa:${material}_boots`).randomChance(0.5).enchantWithLevels(5, false)
            }
            pool.setUniformRolls(4, 6)
            pool.addItem('minecraft:coal_block', '1', [2, 3])
            pool.addItem('create:brass_block', '1', [1, 2])
            pool.addItem('create:zinc_block', '1', [1, 2])
            addArmor('brass')
            addArmor('copper')
            addArmor('zinc')
            pool.addItem('create_sa:copper_sword', '2').randomChance(0.5).enchantWithLevels(5, true)
            pool.addItem('create_sa:zinc_sword', '2').randomChance(0.5).enchantWithLevels(5, true)
            pool.addLootTable(CAPACITOR)
        })
    })
    event.addChest('dungeoncrawl:library', table =>{
        table.addPool(pool =>{
            pool.setUniformRolls(5, 8)
            pool.addItem('minecraft:book', '1', [2, 3])
            pool.addItem('minecraft:writable_book', '1', [1, 2])
            pool.addItem('minecraft:feather', '1', [4, 6])
            pool.addItem('minecraft:paper', '1', [2, 5])
            pool.addItem('minecraft:experience_bottle', '1', [1, 3])
            pool.addItem('minecraft:cobweb', '3', [3, 7])
            pool.addItem('minecraft:book', '2', [1, 3]).randomChance(1).enchantWithLevels(5, true)
        })
    })
    event.addChest('dungeoncrawl:supply', table =>{
        table.addPool(pool =>{
            function addArmor(modid, material){
                pool.addItem(`${modid}:${material}_helmet`).randomChance(0.5).enchantWithLevels(5, false)
                pool.addItem(`${modid}:${material}_chestplate`).randomChance(0.5).enchantWithLevels(5, false)
                pool.addItem(`${modid}:${material}_leggings`).randomChance(0.5).enchantWithLevels(5, false)
                pool.addItem(`${modid}:${material}_boots`).randomChance(0.5).enchantWithLevels(5, false)
            }
            pool.setUniformRolls(6, 9)
            addArmor('create_sa', 'copper')
            addArmor('minecraft', 'leather')
            pool.addItem('create_sa:copper_pickaxe').randomChance(0.5).enchantWithLevels(5, true)
            pool.addItem('create_sa:zinc_pickaxe').randomChance(0.5).enchantWithLevels(5, true)
            pool.addItem('create_sa:copper_shovel').randomChance(0.5).enchantWithLevels(5, true)
            pool.addItem('create_sa:zinc_shovel').randomChance(0.5).enchantWithLevels(5, true)
            pool.addItem(FD+':cooked_bacon', '1', [2, 4])
            pool.addItem(FD+':cooked_mutton_chops', '1', [2, 4])
            pool.addItem(FD+':cooked_chicken_cuts', '1', [2, 4])
            pool.addItem(FD+':cooked_beef_patty', '1', [2, 4])
            pool.addItem('thermal:slag', '1', [1, 4])
            pool.addItem('minecraft:gunpowder', '1', [3, 5])
            pool.addItem('minecraft:torch', '1', [4, 7])
        })
    })
    event.addChest('dungeoncrawl:stage_1', table =>{
        table.addPool(pool =>{
            function addArmor(modid, material){
                pool.addItem(`${modid}:${material}_helmet`).randomChance(0.5).enchantWithLevels(5, false)
                pool.addItem(`${modid}:${material}_chestplate`).randomChance(0.5).enchantWithLevels(5, false)
                pool.addItem(`${modid}:${material}_leggings`).randomChance(0.5).enchantWithLevels(5, false)
                pool.addItem(`${modid}:${material}_boots`).randomChance(0.5).enchantWithLevels(5, false)
            }
            pool.setUniformRolls(5, 7)
            addArmor('minecraft', 'leather')
            pool.addItem('minecraft:stone_bricks', '2', [8, 26])
            pool.addItem('minecraft:torch', '2', [7, 12])
            pool.addItem('minecraft:brick', '2', [8, 16])
            pool.addItem('minecraft:stick', '2', [5, 8])
            pool.addItem('minecraft:tnt', '1', [3, 4])
            pool.addItem('create:cogwheel', '1', [2, 4])
            pool.addItem('create:andesite_alloy', '2', [3, 5])
            pool.addItem('create:shaft', '2', [1, 3])
            pool.addItem('thermal:rosin', '2', [4, 5])
            pool.addItem('minecraft:copper_ingot', '1', [3, 8])
            pool.addItem('minecraft:rotten_flesh', '3', [2, 5])
            pool.addItem('minecraft:bone', '3', [3, 4])
            pool.addItem('minecraft:gunpowder', '3', [4, 6])
            pool.addItem('minecraft:string', '3', [2, 5])
            pool.addItem('minecraft:spider_eye', '3', [1, 3])
            pool.addItem('minecraft:leather_horse_armor').randomChance(0.5).enchantWithLevels(5, true)
            pool.addItem('minecraft:music_disc_cat')
            pool.addItem('minecraft:music_disc_chirp')
        })
    })
    event.addChest('dungeoncrawl:stage_2', table =>{
        table.addPool(pool =>{
            pool.setUniformRolls(5, 7)
            pool.addItem('minecraft:baked_potato', '2', [1, 4])
            pool.addItem(FD+':apple_pie_slice', '2', [1, 4])
            pool.addItem('minecraft:iron_ingot', '3', [1, 5])
            pool.addItem('create:zinc_ingot', '3', [1, 5])
            pool.addItem('minecraft:rotten_flesh', '3', [2, 5])
            pool.addItem('minecraft:bone', '3', [3, 4])
            pool.addItem('minecraft:gunpowder', '3', [4, 6])
            pool.addItem('minecraft:string', '3', [2, 5])
            pool.addItem('minecraft:spider_eye', '3', [1, 3])
            pool.addItem('minecraft:fermented_spider_eye', '3')
            pool.addItem('minecraft:rabbit_hide', '2')
            pool.addItem('minecraft:phantom_membrane', '1', [3, 6])
            pool.addItem('minecraft:gold_nugget', '6', [5, 7])
            pool.addItem('minecraft:iron_nugget', '5', [5, 7])
            pool.addItem('create:andesite_alloy', '2', [3, 5])
            pool.addItem('create:shaft', '2', [2, 5])
            pool.addItem('create:cogwheel', '2', [2, 4])
            pool.addItem('create:large_cogwheel', '2', [1, 3])
            pool.addItem('minecraft:music_disc_cat')
            pool.addItem('minecraft:music_disc_11')
            pool.addItem('minecraft:feather', '1', [3, 7])
            pool.addItem('minecraft:ender_pearl')
            pool.addItem('minecraft:golden_apple')
            pool.addLootTable(CAPACITOR).weight(1)
        })
    })
    event.addChest('dungeoncrawl:stage_3', table =>{
        table.addPool(pool =>{
            function addArmor(modid, material){
                pool.addItem(`${modid}:${material}_helmet`).randomChance(0.5).enchantWithLevels(5, false)
                pool.addItem(`${modid}:${material}_chestplate`).randomChance(0.5).enchantWithLevels(5, false)
                pool.addItem(`${modid}:${material}_leggings`).randomChance(0.5).enchantWithLevels(5, false)
                pool.addItem(`${modid}:${material}_boots`).randomChance(0.5).enchantWithLevels(5, false)
            }
            pool.setUniformRolls(5, 7)
            addArmor('create_sa', 'brass')
            pool.addItem('create_sa:brass_pickaxe').randomChance(0.5).enchantWithLevels(17, false)
            pool.addItem('farmersdelight:bacon_and_eggs', '2', [2, 4])
            pool.addItem('minecraft:phantom_membrane', '1', [3, 6])
            pool.addItem('minecraft:ender_pearl', '1', [2, 3])
            pool.addItem('minecraft:fermented_spider_eye', '3')
            pool.addItem('minecraft:rabbit_hide', '2')
            pool.addItem('minecraft:lapis_lazuli', '3', [3, 7])
            pool.addItem('minecraft:iron_ingot', '3', [1, 5])
            pool.addItem('minecraft:gold_ingot', '3', [1, 5])
            pool.addItem('create:zinc_ingot', '3', [1, 5])
            pool.addItem('create:cogwheel', '2', [2, 4])
            pool.addItem('create:large_cogwheel', '2', [1, 3])
            pool.addItem('create:andesite_casing', '2', [2, 4])
            pool.addItem(INF+':tinydryrubber', '2', [3, 5])
            pool.addItem('thermal:bitumen', '2', [1,6])
            pool.addItem('minecraft:diamond')
            pool.addLootTable(CAPACITOR).weight(1)
        })
    })
    event.addChest('dungeoncrawl:stage_4', table =>{
        table.addPool(pool =>{
            function addArmor(modid, material){
                pool.addItem(`${modid}:${material}_helmet`).randomChance(0.5).enchantWithLevels(17, false)
                pool.addItem(`${modid}:${material}_chestplate`).randomChance(0.5).enchantWithLevels(17, false)
                pool.addItem(`${modid}:${material}_leggings`).randomChance(0.5).enchantWithLevels(17, false)
                pool.addItem(`${modid}:${material}_boots`).randomChance(0.5).enchantWithLevels(17, false)
            }
            pool.setUniformRolls(5, 7)
            addArmor('minecraft', 'diamond')
            addArmor('create_sa', 'brass')
            pool.addItem('minecraft:diamond_axe').randomChance(0.5).enchantWithLevels(17, false)
            pool.addItem('create_sa:brass_axe').randomChance(0.5).enchantWithLevels(17, false)
            pool.addItem('minecraft:diamond_pickaxe').randomChance(0.5).enchantWithLevels(17, false)
            pool.addItem('create_sa:brass_pickaxe').randomChance(0.5).enchantWithLevels(17, false)
            pool.addItem('minecraft:diamond_shovel').randomChance(0.5).enchantWithLevels(17, false)
            pool.addItem('create_sa:brass_shovel').randomChance(0.5).enchantWithLevels(17, false)
            pool.addItem('minecraft:diamond')
            pool.addItem('minecraft:ender_pearl')
            pool.addItem('thermal:bronze_ingot', '2', [1, 3])
            pool.addItem('thermal:lumium_ingot', '1', [1, 2])
            pool.addItem(TCON+':sky_slime_ball', '2', [2, 4])
            pool.addItem('minecraft:amethyst_shard')
            pool.addItem('minecraft:phantom_membrane', '1', [2, 4])
            pool.addItem('minecraft:saddle')
            pool.addItem('minecraft:iron_ingot', '2', [2,4])
            pool.addItem('create:zinc_ingot', '2', [1, 4])
            pool.addItem('thermal:cured_rubber', '2', [2, 5])
            pool.addItem(INF+':plastic', '2', [1, 3])
            pool.addItem('thermal:rich_slag', '2', [2, 4])
            pool.addItem('create:cogwheel', '2', [2, 4])
            pool.addItem('create:large_cogwheel', '2', [1, 3])
            pool.addItem('create:gearbox')
            pool.addItem('create:experience_nugget', '2', [3, 7])
            pool.addItem('thermal:tar', '2', [2, 5])
            pool.addLootTable(CAPACITOR).weight(2)
        })

    })
    event.addChest('dungeoncrawl:stage_5', table=>{
        table.addPool(pool =>{
            function addArmor(modid, material){
                pool.addItem(`${modid}:${material}_helmet`).randomChance(0.5).enchantWithLevels(17, false)
                pool.addItem(`${modid}:${material}_chestplate`).randomChance(0.5).enchantWithLevels(17, false)
                pool.addItem(`${modid}:${material}_leggings`).randomChance(0.5).enchantWithLevels(17, false)
                pool.addItem(`${modid}:${material}_boots`).randomChance(0.5).enchantWithLevels(17, false)
            }
            pool.setUniformRolls(5, 7)
            addArmor('minecraft', 'diamond')
            addArmor('create_sa', 'brass')
            pool.addItem('create_sa:brass_sword').randomChance(0.5).enchantWithLevels(26, true)
            pool.addItem(FD+':melon_juice', '3', [3, 5])
            pool.addItem(FD+':apple_cidar', '3', [3, 5])
            pool.addItem(FD+':hot_cocoa', '3', [3, 5])
            pool.addItem(FD+':dumplings', '3', [3, 5])
            pool.addItem('minecart:diamond', '1', [2, 3])
            pool.addItem('minecraft:ender_pearl', '1', [2, 3])
            pool.addItem('minecraft:lapis_lazuli', '2', [4, 7])
            pool.addItem('minecraft:golden_apple', '2', [1, 2])
            pool.addItem('minecraft:iron_ingot', '2', [2, 4])
            pool.addItem('minecraft:gold_ingot', '2', [2, 4])
            pool.addItem('create:brass_ingot', '2', [3, 5])
            pool.addItem('create:brass_casing', '2', [1, 2])
            pool.addItem('create:copper_casing', '2', [1, 2])
            pool.addItem('create:experience_nugget', '2', [3, 6])
            pool.addItem('create:cogwheel', '2', [2, 4])
            pool.addItem('create:large_cogwheel', '2', [1, 3])
            pool.addItem('create:gearbox', '2')
            pool.addItem('thermal:enderium_ingot', '1', [1, 2])
            pool.addItem('thermal:lumium_ingot', '1', [1, 2])
            pool.addItem('thermal:rich_slag', '2', [2, 4])
            pool.addItem('thermal:tar', '2', [2, 5])
            pool.addItem(INF+':plastic', '2', [1, 3])
            pool.addItem('thermal:cured_rubber', '2', [2, 5])
            pool.addLootTable(CAPACITOR).weight(2)
        })
    })
    event.addChest('dungeoncrawl:treasure', table =>{
        table.addPool(pool =>{
            pool.setUniformRolls(6, 9)
            pool.addItem('create_sa:rose_quartz_sword').randomChance(0.5).enchantWithLevels(30, true)
            pool.addItem('create_sa:rose_quartz_pickaxe').randomChance(0.5).enchantWithLevels(30, true)
            pool.addItem('create_sa:rose_quartz_axe').randomChance(0.5).enchantWithLevels(30, true)
            pool.addItem('create_sa:rose_quartz_shovel').randomChance(0.5).enchantWithLevels(30, true)
            pool.addItem('minecraft:experience_bottle', '2', [8,12])
            pool.addItem('minecraft:book').randomChance(1).enchantWithLevels(30, true)
            pool.addItem('minecraft:diamond', '2', [2, 3])
            pool.addItem('architects_palette:ender_pearl_block', '2')
            pool.addItem('create:brass_block', '2', [2, 3])
            pool.addItem('minecraft:gold_ingot', '3', [5, 9])
            pool.addItem('minecraft:golden_apple', '2', [1, 2])
            pool.addItem('minecraft:enchanted_golden_apple')
            pool.addItem('create_confectionery:ruby_chocolate_candy', '3', [1, 3])
            pool.addItem('thermal:signalum_ingot', '2', [2, 3])
            pool.addItem('thermal:lumium_ingot', '2', [2, 3])
            pool.addItem('thermal:enderium_ingot', '2', [2, 3])
        })
    }) */
})
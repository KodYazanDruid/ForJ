const $LaserLensItem = java('com.buuz135.industrial.item.LaserLensItem')

/* onEvent('init', _ => {
	$DyenamicsDyeColor.dyenamicValues().forEach(color => {
		let lens_id = 'kubejs:laser_lens'+color.id
		Utils.getRegistry('item').register(lens_id, () => new $LaserLensItem(color.analogue.id))
	})
}) */

/* onEvent('client.generate_assets', event => {
	$DyenamicsDyeColor.dyenamicValues().forEach(color => {
		event.addModel('item', 'kubejs:laser_lens'+color.id, model => {
			model.parent('industrialforegoing:item/item')
			model.textures({
				"layer0": "kubejs:item/lens/laser_lens"+color.id
			})
		})
	})
}) */

onEvent('item.registry', event => {
	event.create('ironwood_nugget').displayName('Ironwood Nugget')
		.tag('forge:nuggets')
		.tag('forge:nuggets/ironwood')
	event.create('crushed_ironwood').displayName('Crushed Ironwood')
		.tag('create:crushed_raw_materials')
	//event.create('refined_fluix_mechanism').displayName('Refined Fluix Mechanism')
	//event.create('incomplete_refined_fluix_mechanism', 'create:sequenced_assembly').displayName('Incomplete Refined Fluix Mechanism')
	event.create('tiny_coal').displayName('Tiny Coal')
		.burnTime(200)
		.tag('forge:nuggets')
		.tag('forge:nuggets/coal')
		event.create('tiny_charcoal').displayName('Tiny Charcoal')
		.burnTime(200)
		.tag('forge:nuggets')
		.tag('forge:nuggets/charcoal')
		event.create('range_addon_base').displayName('Range Addon Base')
	event.create('enzymatic_essence_catalyst').displayName('Enzymatic Essence Catalyst')
	event.create('create_manual').displayName('Create Manual').texture('create:item/crafting_blueprint')
	event.create('fiery_nugget').displayName('Fiery Nugget')
		.tag('forge:nuggets')
		.tag('forge:nuggets/fiery')
	event.create('knightmetal_nugget').displayName('Knightmetal Nugget')
		.tag('forge:nuggets')
		.tag('forge:nuggets/knightmetal')
	event.create('independent_ore_prospector').displayName('Independent Ore Prospector')
		.texture('twilightforest:items/lifedrain_scepter')
		.maxDamage(12)
		.unstackable()
	event.create('raw_uranium').displayName('Raw Uranium')
		.tag('forge:raw_materials')
		.tag('forge:raw_materials/uranium')
	event.create('cobalt_dust').displayName('Cobalt Dust')
		.tag('forge:dusts')
		.tag('forge:dusts/cobalt')
	event.create('zinc_dust').displayName('Zinc Dust')
		.tag('forge:dusts')
		.tag('forge:dusts/zinc')
	event.create('lead_shielding').displayName('Lead Shielding').texture('architects_palette:item/cerebral_plate')
})
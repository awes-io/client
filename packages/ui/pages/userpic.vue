<template>
    <AwPage title="AwUserpic">
        <AwGrid :col="{ lg: 3 }">
            <div>
                <p>1. Userpic with picture and name</p>
                <AwUserpic
                    src="https://picsum.photos/72"
                    name="Max Mustermann Max Mustermann"
                />
                <p>2. Userpic with picture and empty name</p>
                <AwUserpic src="https://picsum.photos/72" />
                <p>3. Userpic with empty image and name</p>
                <AwUserpic src="undefined" name="Max Mustermann" />
                <AwUserpic src="null" name="Max Mustermann" />
                <AwUserpic :src="undefined" name="Max Mustermann" />
                <AwUserpic :src="null" name="Max Mustermann" />
                <AwUserpic src="" name="Max Mustermann" />
                <AwUserpic name="Max Mustermann" />
                <p>4. Test with specific user names</p>
                <AwUserpic src="undefined" name="Max" />
                <AwUserpic src="null" name="Max M." />
                <AwUserpic :src="undefined" name="Sds Max-Mustermann" />
                <AwUserpic :src="null" name=" Max " />
                <AwUserpic src="" name="- Max '" />
                <AwUserpic name="Max" />
                <AwUserpic name=" " />
            </div>
            <div>
                <p>
                    5. Userpic with picture and name. Want to render large size.
                </p>
                <AwUserpic
                    src="https://picsum.photos/72"
                    name="Max Mustermann"
                    description="12.12.2020"
                    big-image
                />
                <p>
                    6. Userpic with picture and empty name. Want to render large
                    size.
                </p>
                <AwUserpic src="https://picsum.photos/72" hide-name />
                <p>7. Userpic with empty image and hidden name.</p>
                <AwUserpic src="undefined" name="Max Mustermann" hide-name />
                <AwUserpic src="null" name="Max Mustermann" hide-name />
                <AwUserpic :src="undefined" name="Max Mustermann" hide-name />
                <AwUserpic :src="null" name="Max Mustermann" hide-name />
                <AwUserpic src="" name="Max Mustermann" hide-name />
                <AwUserpic name="Max Mustermann" hide-name />
            </div>
            <div>
                <p>
                    8. Userpic without picture and without name (name should be
                    hidden)
                </p>
                <AwUserpic hide-name />
                <p>9. Userpic without picture, without name (empty tag)</p>
                <AwUserpic />
                <p>10. Test with specific names</p>
                <AwUserpic src="undefined" name="Max" hide-name />
                <AwUserpic src="null" name="Max M." hide-name />
                <AwUserpic
                    :src="undefined"
                    name="Sds Max-Mustermann"
                    hide-name
                />
                <AwUserpic :src="null" name=" Max " hide-name />
                <AwUserpic src="" name="- Max " hide-name />
                <AwUserpic name=" " hide-name />
            </div>
        </AwGrid>
    </AwPage>
</template>
